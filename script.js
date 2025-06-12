document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.querySelector('.map-container');
    const backgroundImage = document.querySelector('.map-background-image');
    const mapPoints = document.querySelectorAll('.map-point');

    const mediaModal = document.getElementById('mediaModal'); // Changed ID
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeButton = document.querySelector('.close-button');

    // Define your media objects. Each entry now has a 'type' property.
    const mediaContent = {        
	point0: { type: 'image', src: 'photo1.jpg' },
        point1: { type: 'image', src: 'video1.jpg' },
        point2: { type: 'image', src: 'photo2.jpg' },
        point3: { type: 'image', src: 'photo3.jpg' },
        point4: { type: 'image', src: 'photo4.jpg' },         
	point5: { type: 'image', src: 'photo5.jpg' }, 
	point6: { type: 'image', src: 'photo6.jpg' },
	point7: { type: 'image', src: 'photo7.jpg' },
	point8: { type: 'image', src: 'photo8.jpg' },
        // Add more points and their corresponding media here
    };

    // Function to position points dynamically (unchanged from previous version)
    function positionPoints() {
        const imgRect = backgroundImage.getBoundingClientRect();

        const imgLeft = imgRect.left;
        const imgTop = imgRect.top;
        const imgWidth = imgRect.width;
        const imgHeight = imgRect.height;

        mapPoints.forEach(point => {
            const xPercent = parseFloat(point.dataset.x);
            const yPercent = parseFloat(point.dataset.y);

            const pointX = imgLeft + (imgWidth * xPercent);
            const pointY = imgTop + (imgHeight * yPercent);

            point.style.left = `${pointX}px`;
            point.style.top = `${pointY}px`;
        });
    }

    // --- Event Listeners ---

    // Position points initially when the page loads (and image is loaded)
    backgroundImage.onload = positionPoints;
    window.addEventListener('DOMContentLoaded', () => {
        if (backgroundImage.complete) {
            positionPoints();
        }
    });

    // Reposition points whenever the window is resized
    window.addEventListener('resize', positionPoints);

    // Logic for opening the modal and setting media
    mapPoints.forEach(point => {
        point.addEventListener('click', () => {
            const pointId = point.id;
            const content = mediaContent[pointId];

            // Reset modal state
            modalImage.style.display = 'none';
            modalVideo.style.display = 'none';
            modalImage.src = '';
            modalVideo.src = ''; // Clear source to prevent loading previous video
            modalVideo.pause(); // Pause any lingering video

            if (content) {
                if (content.type === 'image') {
                    modalImage.src = content.src;
                    modalImage.style.display = 'block';
                } else if (content.type === 'video') {
                    modalVideo.src = content.src;
                    modalVideo.style.display = 'block';
                    modalVideo.load(); // Load the video
                    modalVideo.play(); // Auto-play if 'autoplay' attribute is present
                }
                mediaModal.style.display = 'flex'; // Show the modal
            } else {
                console.warn(`No media defined for point ID: ${pointId}`);
            }
        });
    });

    // Close the modal and pause video when the close button is clicked
    closeButton.addEventListener('click', () => {
        mediaModal.style.display = 'none';
        modalVideo.pause(); // Pause video when modal closes
        modalVideo.currentTime = 0; // Rewind video to start
    });

    // Close the modal and pause video when clicking outside the media
    mediaModal.addEventListener('click', (event) => {
        // Check if the click occurred directly on the modal background, not on the content
        if (event.target === mediaModal) {
            mediaModal.style.display = 'none';
            modalVideo.pause(); // Pause video when modal closes
            modalVideo.currentTime = 0; // Rewind video to start
        }
    });

    // Optional: Close with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mediaModal.style.display === 'flex') {
            mediaModal.style.display = 'none';
            modalVideo.pause(); // Pause video when modal closes
            modalVideo.currentTime = 0; // Rewind video to start
        }
    });
});