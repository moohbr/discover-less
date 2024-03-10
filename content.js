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
