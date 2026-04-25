import "./App.css";
import { useState, useEffect } from "react";

const services = [
  { title: "Web Design & Development", status: "" },
  { title: "Aerial Cinematography", status: "Coming soon" },
  { title: "Video Production", status: "Coming soon" },
  { title: "Photography", status: "Coming soon" },
  { title: "Social Media Content", status: "Coming soon" },
  { title: "Commercial & Brand Media", status: "Coming soon" },
  { title: "Creative Strategy", status: "Coming soon" },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    const sections = document.querySelectorAll(".section");
    const video = document.querySelector(".hero-video");
    const overlay = document.querySelector(".overlay");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -4% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    let ticking = false;
    const updateHero = () => {
