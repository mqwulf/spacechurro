import { useEffect } from 'react';

function SpaceScene() {
    useEffect(() => {
        // Function to load the external script dynamically
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://typpo.github.io/spacekit/build/spacekit.js';
            script.async = true;
            script.onload = () => initializeSpacekit(); // Initialize Spacekit after loading
            document.body.appendChild(script);
        };

        // Function to initialize Spacekit once the script is loaded
        const initializeSpacekit = () => {
            if (window.Spacekit) {
                const container = document.getElementById('spacekit-container');

                // Initialize the Spacekit simulation in the container
                const viz = new window.Spacekit.Simulation(container, {
                    basePath: 'https://typpo.github.io/spacekit/src',
                });

                // Create a background using Yale Bright Star Catalog data
                viz.createStars();

                // Create the sun using a preset space object
                viz.createObject('sun', window.Spacekit.SpaceObjectPresets.SUN);

                // Add planets using Spacekit's presets
                viz.createObject('mercury', window.Spacekit.SpaceObjectPresets.MERCURY);
                viz.createObject('venus', window.Spacekit.SpaceObjectPresets.VENUS);
                viz.createObject('earth', window.Spacekit.SpaceObjectPresets.EARTH);
                viz.createObject('mars', window.Spacekit.SpaceObjectPresets.MARS);
                viz.createObject('jupiter', window.Spacekit.SpaceObjectPresets.JUPITER);
                viz.createObject('saturn', window.Spacekit.SpaceObjectPresets.SATURN);
                viz.createObject('uranus', window.Spacekit.SpaceObjectPresets.URANUS);
                viz.createObject('neptune', window.Spacekit.SpaceObjectPresets.NEPTUNE);


            } else {
                console.error('Spacekit is not available');
            }
        };

        // Load the Spacekit script
        loadScript();

        // Cleanup script from the DOM to avoid memory issues
        return () => {
            const existingScript = document.querySelector(
                'script[src="https://typpo.github.io/spacekit/build/spacekit.js"]'
            );
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div id="spacekit-container" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default SpaceScene;
