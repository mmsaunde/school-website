document.addEventListener("DOMContentLoaded", function () {
  let filterBtns = document.querySelectorAll('.filter-btn');
  let tabItems = document.querySelectorAll('.tab-item');

  filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
          // Remove 'active' class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          // Get the selected tab from the data attribute
          let selectedTab = this.getAttribute('data-tab');

          // Hide all tab items
          tabItems.forEach(tab => {
              tab.classList.remove('select_tab'); 
          });

          // Show the matching tab
          let activeTab = document.querySelector(`.tab-item.${selectedTab}`);
          if (activeTab) {
              activeTab.classList.add('select_tab');
          }
      });
  });

  // Set the height dynamically
  function updateTabHeight() {
      let activeTab = document.querySelector('.tab-item.select_tab');
      if (activeTab) {
          document.querySelector('.tab-filter-item-container').style.height = activeTab.scrollHeight + 'px';
      }
  }

  // Observe changes when a tab is selected
  const observer = new MutationObserver(updateTabHeight);
  tabItems.forEach(tab => observer.observe(tab, { attributes: true }));

  // Initial height setup
  updateTabHeight();
});

