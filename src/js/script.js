/**
 * SCRIPT.JS
 * --------------------------------------------------------
 * Primarily used for the functionality of index.html.
*/

const default_hash = '#home';
const fade_in_delay = 27 // lower values makes the elements show faster on site loading and while changing tabs

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

document.addEventListener('DOMContentLoaded', function() {
    /** 
    // Get all hidden update elements
    const hiddenUpdates = document.querySelectorAll('.hidden-update');
    
    // Process each hidden update
    hiddenUpdates.forEach(update => {
        // Get the em element that contains the date
        const dateEm = update.querySelector('em');
        
        if (dateEm) {
            // Check if it already has the ✖ symbol
            if (!dateEm.textContent.includes('✖')) {
                // Add the ✖ symbol at the beginning
                dateEm.innerHTML = '✖ ' + dateEm.innerHTML;
            }
        }
    });
    */
    
    // COMMENTED: SO IF I DONT LIKE IT I CAN REMOVE IT
    // ADD: SMALL DELAY TO ENSURE ELEMENTS ARE LOADED BEFORE SCROLLING
    setTimeout(function() {
        const currentHash = location.hash || default_hash;
        const targetElement = document.getElementById(currentHash.slice(1));
        
        if (targetElement) {
            targetElement.scrollIntoView();
        }
    }, 100);
    // END OF THE COMMENT: SMALL DELAY TO ENSURE ELEMENTS ARE LOADED BEFORE SCROLLING
});

// remove 'rgb' and brackets from --bg-value so the color can be used in combination with individual opacity-values (rgba)
document.documentElement.style.setProperty('--bg-color', getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim().replace(/rgb\(|\)/g, ''));

location = location.hash||default_hash
changeTab(location.hash.slice(1));

window.addEventListener('hashchange', function() {
    changeTab(location.hash.slice(1));
})

function changeTab(tab) {
    try {
        // Hide all visible elements
        document.querySelectorAll('.fade-in.visible').forEach(element => {
            element.classList.remove('visible');
            element.classList.remove('fade-in-anim');
        });

        // Remove active tab class from all tab_switchers
        document.querySelectorAll('.tab_switcher').forEach(element => { 
            element.classList.remove('tab_active'); 
        });

        // Activate the selected tab
        document.getElementById(tab + '_tab').classList.add('tab_active');
        
        // COMMENTED: SO IF I DONT LIKE IT I CAN REMOVE IT
        setTimeout(function() {
            document.getElementById(tab).scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 100);
        
        // Show elements of the selected tab, but EXCLUDE those inside BCUZ IT TAKES SO MUCH TO FUCKING LOAD FUCK U --> .update-content I HATE U
        let allElements = document.getElementById(tab).querySelectorAll('*');
        let elements = Array.from(allElements).filter(el => !el.closest('.update-content'));  // Filter out hidden update content
        
        if (!effectsDisabled) {
            let delay = 0;
            Array.from(elements).forEach(element => {
                element.classList.add('fade-in');
                setTimeout(function() {
                    element.classList.add('visible');
                    element.classList.add('fade-in-anim');
                }, delay);
                delay += fade_in_delay;
            });
        } else {
            // If effects are disabled, make elements visible directly
            Array.from(elements).forEach(element => {
                element.classList.add('visible'); // Ensure elements are visible
            });
        }
    } catch {
        location.hash = default_hash;
    }
}

/**
 * HAMBURGER / NAVBAR
*/


function toggleMenu() {
    const menu = document.getElementById("nav_tabs");
    const hamburger = document.getElementById("hamburger-menu");
    
    menu.classList.toggle("active");
    hamburger.classList.toggle("active"); 
}

const menuItems = document.querySelectorAll("#nav_tabs li a");
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        toggleMenu();
    });
});

// Close the menu if the user clicks anywhere outside the navbar or hamburger
document.addEventListener('click', function(event) {
    const menu = document.getElementById("nav_tabs");
    const hamburger = document.getElementById("hamburger-menu");
    
    // Check if the click happened outside the menu and hamburger
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        // Close the menu
        if (menu.classList.contains("active")) {
            toggleMenu();
        }
    }
});

/**
 * Mobile Dropdown Toggle
*/
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                dropdownToggle.classList.remove('active');
            }
        });
    }
});


/**
 * "NOT CURRENTLY BEING WORKED ON" HOVER OVER TAG
*/
function initTooltips() {
    // Create tooltip container
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    document.body.appendChild(tooltipElement);

    const OFFSET_X = 12; // Horizontal offset from cursor
    const OFFSET_Y = 12; // Vertical offset from cursor

    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach((tooltip) => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            tooltipElement.textContent = tooltipText;
            tooltipElement.style.opacity = '1'; // Make it visible
        });

        tooltip.addEventListener('mousemove', (event) => {
            // Use event.pageX and event.pageY to fix the scroll bug
            let x = event.pageX + OFFSET_X;
            let y = event.pageY + OFFSET_Y;

            // Prevent tooltip from leaving the right edge
            if (x + tooltipElement.offsetWidth > document.documentElement.clientWidth + window.scrollX) {
                x = document.documentElement.clientWidth + window.scrollX - tooltipElement.offsetWidth - OFFSET_X;
            }

            // Prevent tooltip from leaving the bottom edge
            if (y + tooltipElement.offsetHeight > document.documentElement.clientHeight + window.scrollY) {
                y = event.pageY - tooltipElement.offsetHeight - OFFSET_Y; // Move above if no space below
            }

            tooltipElement.style.left = `${x}px`;
            tooltipElement.style.top = `${y}px`;
        });

        tooltip.addEventListener('mouseleave', () => {
            tooltipElement.style.opacity = '0';
        });
    });
}

initTooltips();
