# discover-less

This script hides the 'Discover More specific elements from the Twitter user interface and prevents them from reappearing.

### Functionality

- Targets elements containing phrases like "Discover more" and "More replies".
- Removes the targeted element and its following siblings with a specific test ID (`data-testid="cellInnerDiv"`).
- Utilizes a MutationObserver to monitor the DOM for changes and dynamically remove newly added elements.

### Installation

This script is intended to be used with as browser extension.

### Usage

1. Install the browser extension.
2. Use!

### Warning

- This script targets elements with the test ID `data-testid="cellInnerDiv"`. If the structure of the Twitter UI changes, you might need to adjust this selector.

### How it Works

1. The script defines an array called `blockedWords` containing phrases used for filtering.
2. The `removeDiscoverMore` function performs the core removal logic:
   - It selects all elements with the `data-testid="cellInnerDiv"` attribute.
   - Iterates through these elements in reverse order for proper removal.
   - For each element, it checks the heading text for any blocked word.
   - If a blocked word is found, the function removes the current element and all its following siblings with the same test ID.
3. The `removeElements` function is a helper function used to remove elements efficiently.
   - It finds the index of the element within its parent node.
   - It hides all following siblings using `display: none` instead of complete removal to avoid triggering Twitter's re-rendering.
4. The script calls `removeDiscoverMore` initially to remove existing elements.
5. Finally, a MutationObserver is created to monitor the DOM for changes. Whenever the DOM structure changes (e.g., new elements are added), the `removeDiscoverMore` function is re-executed to remove any newly added elements containing blocked phrases.

### Disclaimer

**Note:**  Injecting scripts into websites might violate their terms of service. Use this script responsibly and at your own risk. The author is not liable for any misuse or unintended consequences.
