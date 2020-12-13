MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const start = callback => {
    let observer = new MutationObserver(callback)
    
    observer.observe(document, {
      subtree: true,
      attributes: true
    })
}

module.exports = { start }