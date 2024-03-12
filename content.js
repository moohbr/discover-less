/**
 * Removes elements containing blocked phrases and their following siblings with a specific test ID.
 * - Targets elements with the data-testid="cellInnerDiv" attribute.
 */
function findDiscoverMore() {
    // Array of blocked phrases that trigger removal of elements
    const blockedWords = [
        'Discover more',
        'More replies',
    ];

    const elements = document.querySelectorAll('div[data-testid="cellInnerDiv"]');

    // Iterate backwards to ensure correct removal order
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        const heading = element.querySelector('h2 > div:nth-child(2) > span');
        
        const elementText = heading && heading.textContent.trim();
        // Skip elements without text content
        if (!elementText) {
            continue;
        }

        // Check if any blocked word is present in the element text
        if (blockedWords.some(word => elementText.includes(word))) {
            // Remove the current element and its following siblings with the test ID
            removeElements(element, element.parentNode);
        }
    }
}

/**
 * Removes elements containing the text "This Post is from an account you muted."
 * - Targets elements with the data-testid="cellInnerDiv" attribute.
 * - Verifies the text content of the element.
 * - Uses display: none to avoid Twitter re-rendering.
 * - This function is separate from findDiscoverMore to avoid unnecessary checks.
 */
function findMutedPosts() {
    // Text to check for in muted posts
    const blockWord = 'This Post is from an account you muted.';

    const elements = document.querySelectorAll('div[data-testid="cellInnerDiv"]');

    // Interate through the each element and check if the muted post is present
    elements.forEach(element => {
        const heading = element.querySelector('span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3');

        const elementText = heading && heading.textContent.trim();
        // Check if any blocked word is present in the element text
        if (elementText && elementText === blockWord) {
            // Remove the current element and its following siblings with the test ID
            element.style.display = 'none';
        }
    })
}

/**
 * Recursively removes elements from a parent node, starting from a given element.
 * - Avoids Twitter re-rendering by using display: none instead of removeChild.
 * @param element The starting element to remove.
 * @param parentNode The parent node containing the elements to remove.
 */
function removeElements(element, parentNode) {
    // Find the element's index within its parent node
    const elementIndex = Array.from(parentNode.children).indexOf(element);

    // Remove all following siblings with the same test ID
    for (let i = elementIndex; i < parentNode.children.length; i++) {
        parentNode.children[i].style.display = 'none'; // Use display: none for efficiency
    }
}

// Create a MutationObserver to monitor for changes in the DOM
const mutationObserver = new MutationObserver(findDiscoverMore);
mutationObserver.observe(document, { childList: true, subtree: true });

const mutationObserver2 = new MutationObserver(findMutedPosts);
mutationObserver2.observe(document, { childList: true, subtree: true });
