self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Clona la risposta perché la risposta può essere letta solo una volta
            var responseClone = response.clone();

            // Controlla se la risposta ha i cookie
            var cookies = responseClone.headers.get('Set-Cookie');
            if (cookies) {
                console.log('Cookies:', cookies);
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => client.postMessage(cookies));
                });
            }
            return response;
        })
    );
});
