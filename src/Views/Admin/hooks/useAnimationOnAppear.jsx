import { useEffect, useRef, useState } from "react";

export const useAnimationOnAppear = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => setIsVisible(entry.isIntersecting));
		});

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	return {
		isVisible,
		sectionRef,
	};
};
