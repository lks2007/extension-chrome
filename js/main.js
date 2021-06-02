var currentURL;

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, 
function(tabs){
	getCurrentURL(tabs[0].url);
});

function getCurrentURL(tab){
	var currentURL = tab,
    patt = 'https://',
    result = currentURL.match(patt);

    if(result != null){
       $("body").append(`
            <div class="loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="wrapper">
                <h1 style="margin-top: 20px;">Login Here</h1>
                <div class="pannel-user">
                    <span class="fal fa-user user"></span>
                    <input type="text" name="email" placeholder="Email" class="input" id='email' />
                </div>
                <br/><br/><br/>
                <div class="pannel-user">
                    <span class="fal fa-lock user"></span>
                    <input type="password" name="password" placeholder="Password" class="input" id="pwd" />
                </div>
                <input type="submit" name="submit" placeholder="Send" class="submit"/>
            </div>
       `)

       $('.submit').click(function() {
            var $email = $('#email').val(),
                $pwd = $('#pwd').val();
        
            $(".loader").addClass('load')
            $(".wrapper").remove()

            fetch('http://localhost:5555/database/login.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'user='+$email+'&password='+$pwd
              })
              .then(res => res.json())
              .then(response => {
                const result = response;

                $(".loader").removeClass('load')
                if(result['check'] === '1'){
                    $('body').append(`
                        <h1 style="margin-top: 50px;">Devign</h1>
                            <h3>Problem!!! Restart Extension</h3>
                            <h2 class="reload">Restart Now <span class="fal fa-sync restart"></span></h2>
                        </div>
                    `)
                    $('.restart').click(() => {
                        location.reload();
                    })
                }else{
                    $('body').append(`
                        <h1>Devign</h1>
                        <div class="card-name">
                            <img src='./img/`+result['img']+`' width='35px' style="
                            border-radius: 8px;
                        " />
                            <div class="card__title">
                                <h5>Username</h5>
                                <h4>`+result['name']+`</h4>
                            </div>
                        </div>
                    `)
                }
            });
       });
    }else{
        $("body").append(`
            <h1>Devign</h1>
            <h3>You must go to Google</h3>
            <div class="redirect">
                <a href="https://google.fr" target="_blank"><i class="fal fa-arrow-right"></i> Go Google</a>
            </div>
       `)
    }
}