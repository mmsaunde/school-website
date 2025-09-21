// document.addEventListener("DOMContentLoaded", function () {
//     const includeElements = document.querySelectorAll('[data-include]');
  
//     includeElements.forEach(async (el) => {
//       const file = el.getAttribute("data-include");
//       try {
//         const response = await fetch(file);
//         if (response.ok) {
//           const html = await response.text();
//           el.innerHTML = html;
//         } else {
//           el.innerHTML = "<p>Component not found.</p>";
//         }
//       } catch (e) {
//         el.innerHTML = "<p>Error loading component.</p>";
//       }
//     });
//   });
  

document.addEventListener("DOMContentLoaded", function () {
  const includeElements = document.querySelectorAll('[data-include]');
  let includesRemaining = includeElements.length;

  if (includesRemaining === 0) {
      document.dispatchEvent(new Event('includes-loaded'));
      return;
  }

  includeElements.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      try {
          const response = await fetch(file);
          if (response.ok) {
              const html = await response.text();
              el.innerHTML = html;
          } else {
              el.innerHTML = "<p>Component not found.</p>";
          }
      } catch (e) {
          el.innerHTML = "<p>Error loading component.</p>";
      } finally {
          includesRemaining--;
          if (includesRemaining === 0) {
              // Dispatch event after all includes are loaded
              document.dispatchEvent(new Event('includes-loaded'));
          }
      }
  });
});

