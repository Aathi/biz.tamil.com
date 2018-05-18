var AWS = require("aws-sdk");
const fs = require("fs");
const clients = fs.readFileSync(__dirname + "/clients.json", "utf8");
const ourServices = fs.readFileSync(__dirname + "/ourServices.json", "utf8");
const siteUrls = []

process.env["PATH"] =
  process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"];

JSON.parse(clients).map((client, ind) => {
  (function(i) {
    setTimeout(() => {
      collectInfo(client, data => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
      });
    }, 100 * i);
  })(ind);
}, this);

slugName = text => {
  return text.split(" ").join("-");
};

collectInfo = (data, callback) => {
  var html = obituaryTemplate(data);
  var htmlBlob = new Buffer(html, "utf-8");
  var s3 = new AWS.S3();
  var fileName = `${slugName(data["Business Name"])}.html`;
  // var params = {
  //   Bucket: "biz.tamil.com/Construction",
  //   Key: fileName,
  //   Body: htmlBlob,
  //   ContentType: "text/html"
  // };
  // s3.putObject(params, function(err, data) {
  //   if (err) console.log("Function Error: ", err);
  //   return callback(data);
  // });
  fs.writeFile(__dirname + `/html/${fileName}`, htmlBlob, "utf8", err => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  siteUrls.push({
    businessName: data["Business Name"],
    phone: data["Phone"],
    siteUrl: `https://britishtamils.com/${fileName}`
  })

  fs.writeFile(__dirname + `/client-websites.json`, JSON.stringify(siteUrls), "utf8", err => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

// randomColour = () => {
//   return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
// }

randomColour = () => {
  const colours = [
    "#4c98c9",
    "#2b2b2b",
    "linear-gradient(90deg, #a65ccd 0%, #3c9dda 100%)",
    "#3c9dda",
    "#f6f7f8"
  ];
  return colours[Math.floor(Math.random() * colours.length)];
};

randomSlider = () => {
  const slides = [
    "slider1.jpg",
    "slider2.jpg",
    "slider3.jpg",
    "slider4.jpg",
    "slider5.jpg"
  ];
  return slides[Math.floor(Math.random() * slides.length)];
};

randomParallax = () => {
  const parallax = [
    "parallax1.jpg",
    "parallax2.jpg",
    "parallax3.jpg",
    "parallax4.jpg",
    "parallax5.jpg"
  ];
  return parallax[Math.floor(Math.random() * parallax.length)];
};

randomConcept = () => {
  const concepts = [
    "concept1.svg",
    "concept2.svg",
    "concept3.svg",
    "concept4.svg",
    "concept5.svg",
    "concept6.svg",
    "concept7.svg",
    "concept8.svg",
    "concept9.svg",
    "concept10.svg",
    "concept11.svg",
    "concept12.svg"
  ];
  return concepts[Math.floor(Math.random() * concepts.length)];
};

services = ({ id, title, content, image }) => {
  return `
  <div class="space70"></div>
    <div class="row flex-middle gutter60">
      <div class="col-sm-6 ${id % 2 == 0 ? "col-sm-push-6" : ""}">
        <div class="icon-img icon-svg icon-l text-right">
          <img src="style/images/art/${image}" alt="${title}" />
        </div>
      </div>
      <div class="space20 visible-xs clearfix"></div>
      <div class="col-sm-6 ${id % 2 == 0 ? "col-sm-pull-6" : ""}">
        <h2>${title}</h2>
        <p class="lead2 mb-0">
          ${content}
        </p>
      </div>
    </div>
  `;
};

obituaryTemplate = params => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="text" content="">
  <meta name="author" content="">
  <link rel="shortcut icon" href="style/images/favicon.png">
  <title>${params["Business Name"]}</title>
  <link rel="stylesheet" type="text/css" href="style/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="style/css/plugins.css">
  <link rel="stylesheet" type="text/css" href="style/revolution/css/settings.css">
  <link rel="stylesheet" type="text/css" href="style/revolution/css/layers.css">
  <link rel="stylesheet" type="text/css" href="style/revolution/css/navigation.css">
  <link rel="stylesheet" type="text/css" href="style/type/icons.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="style/css/color/blue.css">
  <link href="statics/manifest.json" rel="manifest">
  <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/statics/sw.js').then(function (registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  </script>
</head>

<body>
  <div class="content-wrapper">
    <nav class="navbar">
      <div class="container">
        <div class="flex-it">
          <div class="navbar-header">
            <div class="navbar-brand">
              <a href="index.html">
                ${params["Business Name"]}
              </a>
            </div>
          </div>
          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li>
                <a href="#!">
                  <!-- <span class="caret"></span> -->
                </a>
                <!-- <ul class="dropdown-menu">
                  <li>
                    <a href="#!">Header
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="header.html">Classic Light Header</a>
                      </li>
                      <li>
                        <a href="header2.html">Classic Dark Header</a>
                      </li>
                      <li>
                        <a href="header3.html">Centered Header</a>
                      </li>
                      <li>
                        <a href="header14.html">Alternative Centered Header Dark</a>
                      </li>
                    </ul>
                  </li>
                </ul> -->
              </li>
            </ul>
          </div>
          <div class="navbar-other">
            <ul class="nav">
              <li>
                <!-- <div class="btn-group btn-search">
                  <a href="#" data-toggle="dropdown" class="nav-link">
                    <i class="et-magnifying-glass"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <form class="search-form">
                      <div class="form-group mb-0">
                        <input type="text" class="form-control" placeholder="Search something">
                      </div>
                    </form>
                  </div>
                </div> -->
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="rev_slider_wrapper fullwidth-container">
      <div id="slider4" class="rev_slider rs-nav-light" data-version="5.4.1">
        <ul>
          <li data-transition="fade" data-nav-color="light">
            <img src="style/images/art/${randomSlider()}" alt="" />
            <div class="tp-caption w-regular color-white text-center" data-x="center" data-y="middle" data-voffset="['-35','-35','-55','-50']"
              data-fontsize="['50','50','50','36']" data-lineheight="['60','60','60','46']" data-width="['1100','980','600','450']"
              data-textAlign="['center','center','center','center']" data-whitespace="['normal','normal','normal','normal']"
              data-frames='[{"delay":1000,"speed":1000,"frame":"0","from":"z:0;rX:0deg;rY:0;rZ:0;sX:2;sY:2;skX:0;skY:0;opacity:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
              data-responsive="on" data-responsive_offset="on" style="z-index: 9;">
              ${params["Business Name"]}
              <br/> We design all kind of buildings</div>
            <div class="tp-caption w-light color-white text-center" data-x="center" data-y="middle" data-voffset="['35','35','55','50']"
              data-fontsize="['28','28','28','22']" data-lineheight="['38','38','38','32']" data-width="['1100','980','600','400']"
              data-textAlign="['center','center','center','center']" data-whitespace="['normal','normal','normal','normal']"
              data-frames='[{"delay":1500,"speed":1000,"frame":"0","from":"z:0;rX:0deg;rY:0;rZ:0;sX:2;sY:2;skX:0;skY:0;opacity:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
              data-responsive="on" data-responsive_offset="on" style="z-index: 9;">We Build Buildings Professionally</div>
          </li>
        </ul>
        <div class="tp-bannertimer tp-bottom"></div>
      </div>
    </div>
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <h2 class="section-title text-center">Our Services</h2>
        <p class="lead text-center">We are here to serve you</p>
        <div class="space20"></div>
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            ${JSON.parse(ourServices).map((data, index) =>
              services({
                id: index,
                title: data.title,
                content: data.content,
                image: data.image
              })
            )}
          </div>
        </div>
      </div>
    </div>
    <div class="parallax inverse-text" data-parallax-img="style/images/art/${randomParallax()}" data-parallax-img-width="1920" data-parallax-img-height="1184">
      <div class="container inner pt-120 pb-120">
        <div class="row counter">
          <div class="col-sm-3 text-center">
            <div class="icon icon-l icon-color color-dark mb-15">
              <i class="si-photo_camera"></i>
            </div>
            <h3 class="value mb-15">1539</h3>
            <p class="text-uppercase">PROJECTS</p>
          </div>
          <div class="col-sm-3 text-center">
            <div class="icon icon-l icon-color color-dark mb-15">
              <i class="si-cafe_hot-coffee"></i>
            </div>
            <h3 class="value mb-15">3653</h3>
            <p class="text-uppercase">EMPLOYEES</p>
          </div>
          <div class="col-sm-3 text-center">
            <div class="icon icon-l icon-color color-dark mb-15">
              <i class="si-electronics_tv"></i>
            </div>
            <h3 class="value mb-15">5987</h3>
            <p class="text-uppercase">CONSTRUCTOR</p>
          </div>
          <div class="col-sm-3 text-center">
            <div class="icon icon-l icon-color color-dark mb-15">
              <i class="si-sports_trophy"></i>
            </div>
            <h3 class="value mb-15">3999</h3>
            <p class="text-uppercase">PARTNERS</p>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper gray-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-sm-10">
            <h2 class="sub-heading mb-0">SIGN UP FOR A NEWSLETTER</h2>
          </div>
          <div class="col-sm-2">
            <a href="#" class="btn btn-rounded btn-l mb-0">See Portfolio</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="contact">
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <h2 class="section-title text-center">Contact information</h2>
            <p class="text-center">
              We wanted to Provide the best Service. Please contact us for any further information. We always want to hear from you as
              we put customer satisfaction first.
            </p>
            <ul class="icon-list list-inline text-center">
              <li>
                <i class="et-location-pin"></i>${
                  params["Address"]
                    ? params["Address"]
                    : "Your address goes here"
                }</li>
              <li>
                <i class="et-mail"></i>
                <a href="${
                  params["Email"]
                    ? `mailto:${params["email"]}`
                    : "mailto:example@domain.com"
                }" class="nocolor">${
                  params["Email"] ? params["Email"] : "example@domain.com"
                }</a>
              </li>
              <li>
                <i class="et-old-phone"></i>${
                  params["Phone"] ? params["Phone"] : "+44 (000) 00 00 00 00"
                }</li>
            </ul>
          </div>
        </div>
        <div class="space30"></div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-container">
              <form name="contact" netlify netlify-honeypot="bot-field" hidden>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <textarea name="message"></textarea>
              </form>

              <div id="root"></div>
              <script type="text/babel">
                ReactDOM.render(
                <form className="vanilla vanilla-form" method="post">

                  <div className="row">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="col-sm-6 pr-10">
                      <div className="form-group">
                        <input type="text" className="form-control" name="name" placeholder="Your name" required="required" />
                      </div>
                    </div>
                    <div className="col-sm-6 pl-10">
                      <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Your e-mail" required="required" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <textarea name="message" className="form-control" rows={3} placeholder="Type your message here..." required defaultValue={
                        ""} />
                      <div className="radio-set radio">
                      </div>
                      <button type="submit" className="btn btn-rounded" data-error="Fix errors" data-processing="Sending..." data-success="Thank you!">Submit</button>
                      <footer className="notification-box" />
                    </div>
                  </div>
                </form>, document.getElementById("root") );
              </script>
            </div>
          </div>
          <!--/column -->
          <div class="col-md-6">
            <div class="google-map h360" data-lat="51.211215" data-lng="3.226287"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="dark-wrapper inverse-text" style="background: ${randomColour()}">
    <div class="container inner pt-60 pb-60">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="widget text-center">
            <h3>Get in Touch with Us</h3>
            <p>
              You can also get in touch with us via Social Media. Below are several ways to stay connected with us
            </p>
            <div class="space30"></div>
            <ul class="social social-bg social-s">
              <li>
                <a href="#">
                  <i class="et-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="et-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="et-instagram"></i>
                </a>
              </li>
            </ul>
            <div class="space30"></div>
            <div class="contact-info">
              <span>
              ${
                params["Address"]
                  ? params["Address"]
                  : "Your address goes here"
              }
              </span>
              <span>${params["Phone"] ? params["Phone"] : "020 00000000"}</span>
              <span>
              <a href="${
                params["Email"]
                  ? `mailto:${params["email"]}`
                  : "mailto:example@domain.com"
              }" class="nocolor">${
                params["Email"] ? params["Email"] : "example@domain.com"
              }</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-footer dark-wrapper inverse-text">
      <div class="container inner text-center">
        <p>© 2018 All rights reserved.</p>
      </div>
    </div>
  </footer>
  <script type="text/javascript" src="style/js/jquery.min.js"></script>
  <script type="text/javascript" src="style/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/jquery.themepunch.tools.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/jquery.themepunch.revolution.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.video.min.js"></script>
  <script type="text/javascript" src="style/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
  <script type="text/javascript" src="style/js/plugins.js"></script>
  <script type="text/javascript" src="style/js/scripts.js"></script>
</body>

</html>


  `;
};
