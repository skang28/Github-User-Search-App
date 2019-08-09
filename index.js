function getResults(userHandle) {
    fetch(`https://api.github.com/users/${userHandle}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#errorMessage').text(`Uh oh. Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.resultsList').empty();
    for (let i=0; i < responseJson.length; i++) {
        $('.resultsList').append(
            `<li>
                <p>Repo name: ${responseJson[i].name}</p>
                <p>Repo link: <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></p>
            </li>`
        )
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchUser = $('#handleSearch').val();
        getResults(searchUser);
    });
}

$(watchForm);