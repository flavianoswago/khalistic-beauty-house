export function BookingSteps() {
  const steps = [
    { number: '01', title: 'Choose a service', text: 'Find a treatment and see its illustrative price and duration.' },
    { number: '02', title: 'Pick a time', text: 'Explore sample dates and times that fit your schedule.' },
    { number: '03', title: 'Review your details', text: 'Check the summary, then contact the studio to confirm.' },
  ];
  return <ol className="booking-steps">{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}
