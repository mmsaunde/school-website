    // Access the testimonials
    let testSlide = document.querySelectorAll('.slide');
    // Access the indicators
    let dots = document.querySelectorAll('.dot');

    var counter = 0;

    // Add click event to the indicators
    function switchTest(currentTest){
        var testId = currentTest.getAttribute('attr');
    
        if(testId == counter) return;
    
        // Animate out current slide
        if(testId > counter){
            testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
        } else {
            testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
        }
    
        counter = testId;
    
        // Animate in new slide
        if(testId > counter){
            testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
        } else {
            testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
        }
    
        indicators(); // Now updates indicator correctly
    }
    

    // Add and remove active class from the indicators
    function indicators(){
        dots.forEach(dot => dot.classList.remove('active'));
        dots[counter].classList.add('active');
    }

    // Code for auto sliding
    function slideNext(){
        testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
        if(counter >= testSlide.length - 1){
            counter = 0;
        }
        else{
            counter++;
        }
        testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
        indicators();
    }
    function autoSliding(){
        deleteInterval = setInterval(timer, 5000);
        function timer(){
            slideNext();
            indicators();
        }
    }
    autoSliding();

    // Stop auto sliding when mouse is over the indicators
    const carousel = document.querySelector('.indicators');
    carousel.addEventListener('mouseover', pause);
    function pause(){
        clearInterval(deleteInterval);
    }

    // Resume sliding when mouse is out of the indicators
    carousel.addEventListener('mouseout', autoSliding);