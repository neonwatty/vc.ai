import './style.css'

// Define wheel segments
const segments = [
  'AI',
  'Crypto',
  'E-scooters',
  'Sexbots',
  'Gov\'t overhall',
  'Fentanyl'
];

// Get number of segments
const segmentCount = segments.length;

// Initialize wheel state
let spinning = false;
let rotationAngle = 0;
let selectedSegment = null;

// Create the app HTML content
document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>The Ultimate AI VC</h1>
    
    <div class="wheel-container">
      <div class="wheel" id="wheel"></div>
      <div class="wheel-arrow"></div>
    </div>
    
    <div class="controls">
      <button id="spin-button">SPIN</button>
    </div>
    
    <div id="result"></div>
  </div>
`;

// Create wheel segments
const wheel = document.getElementById('wheel');
const segmentAngle = 360 / segmentCount;

segments.forEach((segment, index) => {
  const segmentEl = document.createElement('div');
  segmentEl.className = 'wheel-segment';
  
  // Create a span for the text to allow better positioning
  const textEl = document.createElement('span');
  textEl.textContent = segment;
  textEl.className = 'segment-text';
  
  // Calculate the rotation angle for each text element based on segment position
  // This will make the text more readable based on where it appears on the wheel
  const midAngle = index * segmentAngle + segmentAngle / 2;
  textEl.style.transform = `rotate(${90 - midAngle}deg)`;
  
  segmentEl.appendChild(textEl);
  
  // Set segment position and rotation
  const rotation = index * segmentAngle;
  segmentEl.style.transform = `rotate(${rotation}deg)`;
  segmentEl.style.background = getSegmentColor(index);
  
  // Set segment size according to the angle
  const degToRad = Math.PI / 180;
  const skew = 90 - segmentAngle;
  segmentEl.style.clipPath = `polygon(0 0, 100% 0, 50% 100%)`;
  segmentEl.style.transformOrigin = `center bottom`;
  
  wheel.appendChild(segmentEl);
});

// Function to get a color based on index
function getSegmentColor(index) {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  return colors[index % colors.length];
}

// Set up spin button
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

spinButton.addEventListener('click', () => {
  if (spinning) return;
  
  spinning = true;
  spinButton.disabled = true;
  resultDisplay.textContent = '';
  
  // Random rotation between 4 and 8 full rotations (increased duration)
  const spinRotations = 4 + Math.random() * 4;
  const spinDuration = 5 + Math.random() * 3; // seconds (increased duration)
  
  // Random stopping angle
  const randomAngle = Math.floor(Math.random() * 360);
  const totalRotation = 360 * spinRotations + randomAngle;
  
  // Apply animation
  wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.1, 0.25, 0.1, 1)`;
  wheel.style.transform = `rotate(${totalRotation}deg)`;
  
  // Determine the winning segment
  setTimeout(() => {
    spinning = false;
    spinButton.disabled = false;
    rotationAngle = totalRotation % 360;
    
    // Calculate winning segment
    // The wheel rotates clockwise, so we need to calculate the opposite position
    // Adding half a segment angle to ensure alignment with the arrow
    const normalizedAngle = (360 - (rotationAngle % 360) + segmentAngle/2) % 360;
    const winningSegmentIndex = Math.floor(normalizedAngle / segmentAngle) % segmentCount;
    
    // Changed from "Result: " to "We go with: "
    resultDisplay.textContent = `We go with: ${segments[winningSegmentIndex]}`;
  }, spinDuration * 1000);
});
