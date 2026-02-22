import './FloatingElements.css';

export default function FloatingElements() {
  return (
    <div className="floating-elements" aria-hidden="true">
      <div className="floating-orb floating-orb--1" />
      <div className="floating-orb floating-orb--2" />
      <div className="floating-orb floating-orb--3" />
      <div className="floating-line floating-line--1" />
      <div className="floating-line floating-line--2" />
    </div>
  );
}
