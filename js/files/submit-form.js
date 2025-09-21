// document.getElementById("contactForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     var formData = new FormData(this);

//     fetch("https://script.google.com/macros/s/AKfycbyG2lTWEVJWUrWLWWUKAZUjYuKG9uIr4fKCbIXkCty12j13zGnsqrrI-VYrqwGe6geu/exec", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams(formData)
//     })
//     .then(response => response.json()) // Parse JSON response
//     .then(data => {
//         if (data.redirect) {
//             window.location.href = data.redirect; // Redirect to success.html
//         }
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         alert("There was an issue submitting your form.");
//     });
// });


const forms = [
    "reviewForm",
    "feedbackForm",
    "mailingListForm",
    "applicationForm",
    "partnershipForm",
    "giftCardForm",
    "websiteIssueForm"
  ];
  
  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener("submit", function(event) {
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
  


// const forms = [
//     "contactForm",
//     "reviewForm",
//     "feedbackForm",
//     "mailingListForm",
//     "applicationForm",
//     "partnershipForm",
//     "giftCardForm",
//     "websiteIssueForm"
//   ];
  
//   forms.forEach(formId => {
//     const form = document.getElementById(formId);
//     if (form) {
//       form.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const formData = new FormData(this);
  
//         fetch("https://script.google.com/macros/s/AKfycbyG2lTWEVJWUrWLWWUKAZUjYuKG9uIr4fKCbIXkCty12j13zGnsqrrI-VYrqwGe6geu/exec", {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: new URLSearchParams(formData)
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.redirect) {
//             window.location.href = data.redirect;
//           }
//         })
//         .catch(error => {
//           console.error("Error:", error);
//           alert("There was an issue submitting your form.");
//         });
//       });
//     }
//   });
  