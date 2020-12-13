const { desktopCapturer } = require('electron')

const getDisplayMedia = () => {
    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
        try {
            const sources = await (await desktopCapturer.getSources({ types: ['screen', 'window'] })).filter(({thumbnail}) => thumbnail.toDataURL().length != 22)
            const selectionHolder = document.createElement('div')

            selectionHolder.classList = 'desktop-capturer-selection'
            /* eslint-disable no-unused-vars */
            selectionHolder.innerHTML = `
                <div class="desktop-capturer-selection__scroller">
                    <ul class="desktop-capturer-selection__list">
                        ${sources.map(({id, name, thumbnail, display_id, appIcon}) => `
                            <li class="desktop-capturer-selection__item">
                                <button class="desktop-capturer-selection__btn" data-id="${id}" title="${name}">
                                    <img class="desktop-capturer-selection__thumbnail" src="${thumbnail.toDataURL()}" />
                                    <span class="desktop-capturer-selection__name">${name == "Entire Screen" ? "Ganzer Bildschrim" : name}</span>
                                </button>
                            </li>
                        `).join("")}
                    </ul>
                </div>`

        document.body.appendChild(selectionHolder)
  
        document.querySelectorAll('.desktop-capturer-selection__btn').forEach(button => {
            button.addEventListener('click', async () => {
              try {
                const id = button.getAttribute('data-id')
                const source = sources.find(source => source.id === id)

                if(!source)
                  throw new Error("Source with id ${id} does not exist")
                
                const stream = await window.navigator.mediaDevices.getUserMedia({
                  audio: false,
                  video: {
                    mandatory: {
                      chromeMediaSource: "desktop",
                      chromeMediaSourceId: source.id
                    }
                  }
                })
                resolve(stream)
  
                selectionHolder.remove()
              } catch (error) {
                console.error("Error selecting desktop capture source:", error)
                reject(error)
              }
            })
          })
        } catch (error) {
            console.error("Error displaying desktop capture sources:", error)
            reject(error)
        }
    })
}

module.exports = { getDisplayMedia }