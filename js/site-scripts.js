// Wait for includes to finish loading before initializing anything
document.addEventListener("includes-loaded", function () {
    // Smooth Scroll To Top
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById("progress");
      let progressValue = document.getElementById("progress-value");
      let pos = document.documentElement.scrollTop || document.body.scrollTop;
      let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);
  
      if (pos > 100) {
        scrollProgress.style.display = "grid";
      } else {
        scrollProgress.style.display = "none";
      }
  
      scrollProgress.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  
      scrollProgress.style.background = `conic-gradient(#47633f ${scrollValue}%, #808080 ${scrollValue}%)`;
    };
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
  
    // Highlight Active Page
    const navLinkEls = document.querySelectorAll('.nav__link');
    const windowPathName = window.location.pathname;
  
    navLinkEls.forEach(navLinkEl => {
      const navLinkPathName = new URL(navLinkEl.href).pathname;
      if ((windowPathName === navLinkPathName) || (windowPathName === '/index.html' && navLinkPathName === '/')) {
        navLinkEl.classList.add('active');
      }
    });
  
    // Open & Close Hamburger
    const navEl = document.querySelector('.nav');
    const hamburgerEl = document.querySelector('.hamburger');
    const navItemEls = document.querySelectorAll('.nav__item');
  
    if (hamburgerEl) {
      hamburgerEl.addEventListener('click', () => {
        navEl.classList.toggle('nav--open');
        hamburgerEl.classList.toggle('hamburger--open');
      });
  
      navItemEls.forEach(navItemEl => {
        navItemEl.addEventListener('click', () => {
          navEl.classList.remove('nav--open');
          hamburgerEl.classList.remove('hamburger--open');
        });
      });
    }
  
    // Switch Tab and Content
    let filterBtns = document.querySelectorAll('.filter-btn');
    let tabItems = document.querySelectorAll('.tab-item');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
  
        let selectedTab = this.getAttribute('data-tab');
        tabItems.forEach(tab => tab.classList.remove('select_tab'));
  
        let activeTab = document.querySelector(`.tab-item.${selectedTab}`);
        if (activeTab) {
          activeTab.classList.add('select_tab');
        }
      });
    });
  
    function updateTabHeight() {
      let activeTab = document.querySelector('.tab-item.select_tab');
      if (activeTab) {
        document.querySelector('.tab-filter-item-container').style.height = activeTab.scrollHeight + 'px';
      }
    }
  
    const observer = new MutationObserver(updateTabHeight);
    tabItems.forEach(tab => observer.observe(tab, { attributes: true }));
    updateTabHeight();
  
    // Validate Form Fields
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  
    // Write Form Data to Spreadsheet
    const formIds = [
      "reviewForm",
      "feedbackForm",
      "mailingListForm",
      "applicationForm",
      "partnershipForm",
      "giftCardForm",
      "websiteIssueForm"
    ];
  
    formIds.forEach(formId => {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          const formData = new FormData(this);
  
          fetch("https://script.google.com/macros/s/AKfycbyG2lTWEVJWUrWLWWUKAZUjYuKG9uIr4fKCbIXkCty12j13zGnsqrrI-VYrqwGe6geu/exec", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData)
          })
            .then(res => res.json())
            .then(data => {
              if (data.redirect) window.location.href = data.redirect;
            })
            .catch(error => {
              console.error("Error:", error);
              alert("There was an issue submitting your form.");
            });
        });
      }
    });
  
// Show Dialog Elements
const triggers = [
  // Forms
    { trigger: "reviewTrigger", dialog: "reviewDialog" },
    { trigger: "feedbackTrigger", dialog: "feedbackDialog" },
    { trigger: "mailingListTrigger", dialog: "mailingListDialog" },
    { trigger: "applicationTrigger", dialog: "applicationDialog" },
    { trigger: "partnershipTrigger", dialog: "partnershipDialog" },
    { trigger: "giftCardTrigger", dialog: "giftCardDialog" },
    { trigger: "websiteIssueTrigger", dialog: "websiteIssueDialog" }
    ];
  
    triggers.forEach(({ trigger, dialog }) => {
        const triggerElement = document.getElementById(trigger);
        const dialogElement = document.getElementById(dialog);
        if (triggerElement && dialogElement) {
        triggerElement.addEventListener("click", function (event) {
            event.preventDefault();
            dialogElement.showModal();
        });
        dialogElement.addEventListener("click", function (event) {
            if (event.target === dialogElement) {
            dialogElement.close();
            }
        });
        }
    });
});
  
  // Slideshow
  let testSlide = document.querySelectorAll('.slide');
  let dots = document.querySelectorAll('.dot');
  var counter = 0;
  
  function switchTest(currentTest) {
    var testId = currentTest.getAttribute('attr');
    if (testId == counter) return;
  
    if (testId > counter) {
      testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
    } else {
      testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
    }
  
    counter = testId;
  
    if (testId > counter) {
      testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
    } else {
      testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
    }
  
    indicators();
  }
  
  function indicators() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[counter].classList.add('active');
  }
  
  function slideNext() {
    testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
    if (counter >= testSlide.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
    indicators();
  }
  
  function autoSliding() {
    deleteInterval = setInterval(timer, 5000);
    function timer() {
      slideNext();
      indicators();
    }
  }
  autoSliding();
  
  const carousel = document.querySelector('.indicators');
  carousel.addEventListener('mouseover', pause);
  function pause() {
    clearInterval(deleteInterval);
  }
  carousel.addEventListener('mouseout', autoSliding);
  