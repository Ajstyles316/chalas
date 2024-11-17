
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ResetPassword } from '../../../Views/Users Module/components/ResetPassword';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
  };
});

describe('ResetPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the ResetPassword component correctly', () => {
    render(<ResetPassword />);
    expect(screen.getByText(/Recuperar Contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar enlace de recuperación/i })).toBeInTheDocument();
  });

  it('displays an error message when email is not provided', async () => {
    render(<ResetPassword />);

    const submitButton = screen.getByRole('button', { name: /enviar enlace de recuperación/i });
    await userEvent.click(submitButton);

    // Utilizar `waitFor` para esperar a que aparezca el mensaje
    await waitFor(() => {
        expect(screen.queryByText((content) => content.includes("Por favor, ingresa tu correo electrónico"))).toBeInTheDocument();
      });      
  });

  it('sends a password reset email when a valid email is provided', async () => {
    const mockEmail = 'test@example.com';
    sendPasswordResetEmail.mockResolvedValueOnce();

    render(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
    const submitButton = screen.getByRole('button', { name: /enviar enlace de recuperación/i });

    await userEvent.type(emailInput, mockEmail);
    await userEvent.click(submitButton);

    // Esperar a que aparezca el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/Correo de recuperación enviado/i)).toBeInTheDocument();
    });

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), mockEmail);
  });

  it('displays an error message when sendPasswordResetEmail fails', async () => {
    const mockError = new Error('Error al enviar el correo');
    sendPasswordResetEmail.mockRejectedValueOnce(mockError);

    render(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
    const submitButton = screen.getByRole('button', { name: /enviar enlace de recuperación/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(submitButton);

    // Utilizar `waitFor` para el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error: Error al enviar el correo/i)).toBeInTheDocument();
    });
  });
});
