const api= axios.create({
    baseURL: 'https://api.thecatapi.com/v1/'
});
api.defaults.headers.common['X-API-KEY']= 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'



const API_URL_RANDOM = ('https://api.thecatapi.com/v1/images/search?limit=2');

const API_URL_FAVORITES = ('https://api.thecatapi.com/v1/favourites?limit=1000');

const API_URL_UPLOAD = ('https://api.thecatapi.com/v1/images/upload?limit=1000');

const API_URL_PHOTOS_UPLOAD = ('https://api.thecatapi.com/v1/images/?limit=10&page=0&order=DESC');


const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_DELETE_UPLOAD_PHOTOS = (id) => `https://api.thecatapi.com/v1/images/${id}`;

const spanError = document.getElementById('error')

const loadRandomMichis = async (urlApiRandom) => {
    let response;

    try {
        response = await fetch(urlApiRandom);
        const data = await response.json();
        console.log('random')
        console.log(data)
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        img1.src = data[0].url;
        img2.src = data[1].url;

        const btn1 = document.getElementById('btn-random-1');
        const btn2 = document.getElementById('btn-random-2');
        btn1.onclick = function () {
            saveFavoriteMichi(data[0].id);
        };

        btn2.onclick = function () {
            saveFavoriteMichi(data[1].id);
        };
    } catch (error) {
        if (response.status !== 200) {
            spanError.innerText = 'hubo un error: ' + response.status
        }
    }
}

async function loadFavoritesMichis(urlApiFavorites) {
    let response;

    try {
        response = await fetch(urlApiFavorites, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            }
        });
        console.log(response.status)
        const data = await response.json();
        console.log('favoritos')
        console.log(data)
        const section = document.getElementById('favorites-michis')
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis Favoritos');
        h2.appendChild(h2Text);
        section.append(h2);
        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos')

            btn.appendChild(btnText);
            btn.onclick = function () {
                deleteFavoriteMichi(michi.id);
            };
            img.src = michi.image.url;
            img.width = 150;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    } catch (error) {
        if (response.status !== 200) {
            spanError.innerText = 'hubo un error: ' + response.status
        }
    }
}

async function saveFavoriteMichi(id) {
    let response;

    try {
        const res= await api.post('favourites?limit=1000',{
            image_id: id
        })
        loadFavoritesMichis(API_URL_FAVORITES)
/*         response = await fetch(API_URL_FAVORITES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            },
            body: JSON.stringify({
                image_id: id,
            }),
        });
        console.log('guardar')
        console.log(response)
        loadFavoritesMichis(API_URL_FAVORITES); */

    } catch (error) {
        if (response.status !== 200) {
            spanError.innerText = 'hubo un error: ' + response.status
        }
    }
}

 async function deleteUpPohoto(id) {
    let response;

    try {
        response = await fetch(API_URL_DELETE_UPLOAD_PHOTOS(id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            }
        });
        console.log('borrar')
        console.log(response)

    } catch (error) {
        if (response.status !== 200) {
            spanError.innerText = 'hubo un error: ' + response.status
        }
    }
}


async function deleteFavoriteMichi(id) {
    let response;
    try {
        response = await fetch(API_URL_FAVORITES_DELETE(id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            }
        });
        console.log('borrar')
        console.log(response)


    } catch (error) {
        if (response.status !== 200) {
            spanError.innerText = 'hubo un error: ' + response.status
        }
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);


    let response;

    try {
        response = await fetch(API_URL_UPLOAD, {
            method: 'POST',
            headers: {
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            },
            body: formData,
        });


        console.log('Response:', response); // Agregado para ver la respuesta

        if (response.status === 200|| response.status === 201) {
            console.log('Foto subida exitosamente');
            saveInFavoritesPhotoUpload();
            // Realiza acciones adicionales si es necesario
        } else {
            console.error('Hubo un error: ' + response.status);
            spanError.innerText = 'Hubo un error: ' + response.status;
        }
    } catch (error) {
        console.error('Hubo un error:', error.message);
        spanError.innerText = 'Hubo un error: ' + error.message;
    }
}

async function saveInFavoritesPhotoUpload(){
    let response;

    try {
        response = await fetch(API_URL_PHOTOS_UPLOAD, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_eLJwwFuLn3l6gpiYTQEiUAhwgltIZyAOCglOHR746IsxZ9yh1MBuQH10LM4ASjfg'
            }
        });
        const data = await response.json();


        console.log('Response:', response); // Agregado para ver la respuesta
        console.log('Data: ', data);
        const lastPhoto= data[0];
        console.log('Last photo', lastPhoto);
        saveFavoriteMichi(lastPhoto.id);


        if (response.status === 200|| response.status === 201) {
            console.log('Foto subida exitosamente');

            // Realiza acciones adicionales si es necesario
        } else {
            console.error('Hubo un error: ' + response.status);
            spanError.innerText = 'Hubo un error: ' + response.status;
        }
    } catch (error) {
        console.error('Hubo un error:', error.message);
        spanError.innerText = 'Hubo un error: ' + error.message;
    }
}





loadRandomMichis(API_URL_RANDOM);
loadFavoritesMichis(API_URL_FAVORITES);
