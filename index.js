var AWS = require("aws-sdk");
const fs = require("fs");
const clients = fs.readFileSync(__dirname + "/clients.json", "utf8");

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
  return text.split(' ').join('-')
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
};

randomColour = () => {
  return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

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
<title>crea;tink</title>
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
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/statics/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
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
          <div class="nav-bars-wrapper">
            <div class="nav-bars-inner">
              <div class="nav-bars" data-toggle="collapse" data-target=".navbar-collapse"><span></span></div>
            </div>
            <!-- /.nav-bars-inner --> 
          </div>
          <!-- /.nav-bars-wrapper -->
          <div class="navbar-other">
            <ul class="nav">
              <li>
                <div class="btn-group btn-search"> <a href="#" data-toggle="dropdown" class="nav-link"><i class="et-magnifying-glass"></i></a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <form class="search-form">
                      <div class="form-group mb-0">
                        <input type="text" class="form-control" placeholder="Search something">
                      </div>
                      <!-- /.form-group -->
                    </form>
                    <!-- /.search-form --> 
                  </div>
                  <!-- /.dropdown-menu --> 
                </div>
                <!-- /.btn-group --></li>
              <li>
                <div class="btn-group btn-cart"> <a href="#" data-toggle="dropdown" class="nav-link"><i class="et-shopping-basket"></i><span class="badge-s bg-default">3</span></a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <h4>Shopping Cart</h4>
                    <ul class="image-list">
                      <li>
                        <figure class="overlay overlay1"><a href="blog-post.html"></a> <img src="style/images/art/hs1.jpg" alt="" />
                          <figcaption><i class="et-link from-top icon-xs"></i></figcaption>
                        </figure>
                        <div class="post-content">
                          <h6 class="post-title"> <a href="blog-post.html">Fermentum Justo</a> </h6>
                          <div class="meta price"><em class="quantity">1</em><span class="amount">$45.00</span></div>
                        </div>
                      </li>
                      <li>
                        <figure class="overlay overlay1"> <a href="blog-post.html"></a><img src="style/images/art/hs2.jpg" alt="" />
                          <figcaption><i class="et-link from-top icon-xs"></i></figcaption>
                        </figure>
                        <div class="post-content">
                          <h6 class="post-title"> <a href="blog-post.html">Adipiscing Fermentum Etiam</a> </h6>
                          <div class="meta price"><em class="quantity">2</em><span class="amount">$45.00</span></div>
                        </div>
                      </li>
                      <li>
                        <figure class="overlay overlay1"><a href="blog-post.html"> </a><img src="style/images/art/hs3.jpg" alt="" />
                          <figcaption><i class="et-link from-top icon-xs"></i></figcaption>
                        </figure>
                        <div class="post-content">
                          <h6 class="post-title"> <a href="blog-post.html">Risus Cursus Consectetur</a> </h6>
                          <div class="meta price"><em class="quantity">1</em><span class="amount">$45.00</span></div>
                        </div>
                      </li>
                    </ul>
                    <!-- /.image-list -->
                    <hr class="pt-20 mb-20" />
                    <div class="pull-left">
                      <h6 class="mb-0">Total:</h6>
                      <div class="meta price mb-0"><span class="amount">$45.00</span></div>
                    </div>
                    <!-- /.pull-left -->
                    <div class="pull-right"> <a href="#" class="btn btn-rounded mb-0">Checkout</a> </div>
                    <!-- /.pull-right --> 
                  </div>
                  <!-- /.dropdown-menu --> 
                </div>
                <!-- /.btn-group --></li>
            </ul>
          </div>
          <!-- /.navbar-other --> 
        </div>
        <!-- /.nav-header -->
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="#!">Features <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#!">Header <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="header.html">Classic Light Header</a></li>
                    <li><a href="header2.html">Classic Dark Header</a></li>
                    <li><a href="header3.html">Centered Header</a></li>
                    <li><a href="header14.html">Alternative Centered Header Dark</a></li>
                  </ul>
                  <!--/.dropdown-menu --> 
                </li>
              </ul>
              <!--/.dropdown-menu --> 
            </li>
          </ul>
          <!--/.navbar-nav --> 
        </div>
        <!--/.nav-collapse -->
        <div class="navbar-other">
          <ul class="nav">
            <li>
              <div class="btn-group btn-search"> <a href="#" data-toggle="dropdown" class="nav-link"><i class="et-magnifying-glass"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <form class="search-form">
                    <div class="form-group mb-0">
                      <input type="text" class="form-control" placeholder="Search something">
                    </div>
                    <!-- /.form-group -->
                  </form>
                  <!-- /.search-form --> 
                </div>
                <!-- /.dropdown-menu --> 
              </div>
              <!-- /.btn-group --></li>
            <li>
              <!-- /.btn-group --></li>
          </ul>
        </div>
        <!-- /.navbar-other --> 
      </div>
      <!--/.flex-it --> 
    </div>
    <!--/.container --> 
  </nav>

  <div class="rev_slider_wrapper fullwidth-container">
    <div id="slider4" class="rev_slider rs-nav-light" data-version="5.4.1">
      <ul>
        <li data-transition="fade" data-nav-color="light"><img src="style/images/art/slider-bg10.jpg" alt="" />
          <div class="tp-caption w-regular color-white text-center" 
	        data-x="center"
			data-y="middle" 
			data-voffset="['-35','-35','-55','-50']"
			data-fontsize="['50','50','50','36']"
			data-lineheight="['60','60','60','46']"
			data-width="['1100','980','600','450']"
			data-textAlign="['center','center','center','center']"
			data-whitespace="['normal','normal','normal','normal']"
			data-frames='[{"delay":1000,"speed":1000,"frame":"0","from":"z:0;rX:0deg;rY:0;rZ:0;sX:2;sY:2;skX:0;skY:0;opacity:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
			data-responsive="on" 
			data-responsive_offset="on" 
      style="z-index: 9;">
      ${params["Business Name"]}<br/>
     We design all kind of buildings</div>
          <div class="tp-caption w-light color-white text-center" 
			data-x="center" 
			data-y="middle" 
			data-voffset="['35','35','55','50']"
			data-fontsize="['28','28','28','22']"
			data-lineheight="['38','38','38','32']"
			data-width="['1100','980','600','400']"
			data-textAlign="['center','center','center','center']"
			data-whitespace="['normal','normal','normal','normal']"
			data-frames='[{"delay":1500,"speed":1000,"frame":"0","from":"z:0;rX:0deg;rY:0;rZ:0;sX:2;sY:2;skX:0;skY:0;opacity:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
			data-responsive="on" 
			data-responsive_offset="on" 
			style="z-index: 9;">We Build Buildings Professionally</div>
        </li>
      </ul>
      <div class="tp-bannertimer tp-bottom"></div>
    </div>
    <!-- /.rev_slider --> 
  </div>
  <!-- /.rev_slider_wrapper -->


  <div class="wrapper light-wrapper">
    <div class="container inner">
      <h2 class="section-title text-center">Our Services</h2>
      <p class="lead text-center">We are here to serve you</p>
      <div class="space20"></div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="row flex-middle gutter60">
            <div class="col-sm-6 col-sm-push-6">
              <div class="icon-img icon-svg icon-l"><img src="style/images/icons/concept5.svg" alt="" /></div>
            </div>
            <!--/column -->
            <div class="space20 visible-xs clearfix"></div>
            <div class="col-sm-6 col-sm-pull-6">
              <h2>SECRETS OF SUCCESS OF OUR PROJECTS</h2>
              <p class="lead2 mb-0">
                ince 1980 Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
              </p>
            </div>
            <!--/column --> 
          </div>
          <!--/.row -->
          <div class="space70"></div>
          <div class="row flex-middle gutter60">
            <div class="col-sm-6">
              <div class="icon-img icon-svg icon-l text-right"><img src="style/images/icons/concept4.svg" alt="" /></div>
            </div>
            <!--/column -->
            <div class="space20 visible-xs clearfix"></div>
            <div class="col-sm-6">
              <h2>OUR DONE PROJECTS</h2>
              <p class="lead2 mb-0">
                Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name
              </p>
            </div>
            <!--/column --> 
          </div>
          <!--/.row -->
          <!--/.row --> 
          
        </div>
        <!-- /column --> 
      </div>
      <!-- /.row --> 
    </div>
    <!-- /.container --> 
  </div>

  <!-- /.light-wrapper -->
  
  <div class="parallax inverse-text" data-parallax-img="style/images/art/parallax2.jpg" data-parallax-img-width="1920" data-parallax-img-height="1184">
    <div class="container inner pt-120 pb-120">
      <div class="row counter">
        <div class="col-sm-3 text-center">
          <div class="icon icon-l icon-color color-dark mb-15"> <i class="si-photo_camera"></i> </div>
          <h3 class="value mb-15">1539</h3>
          <p class="text-uppercase">PROJECTS</p>
        </div>
        <!--/column -->
        <div class="col-sm-3 text-center">
          <div class="icon icon-l icon-color color-dark mb-15"> <i class="si-cafe_hot-coffee"></i> </div>
          <h3 class="value mb-15">3653</h3>
          <p class="text-uppercase">EMPLOYEES</p>
        </div>
        <!--/column -->
        <div class="col-sm-3 text-center">
          <div class="icon icon-l icon-color color-dark mb-15"> <i class="si-electronics_tv"></i> </div>
          <h3 class="value mb-15">5987</h3>
          <p class="text-uppercase">CONSTRUCTOR</p>
        </div>
        <!--/column -->
        <div class="col-sm-3 text-center">
          <div class="icon icon-l icon-color color-dark mb-15"> <i class="si-sports_trophy"></i> </div>
          <h3 class="value mb-15">3999</h3>
          <p class="text-uppercase">PARTNERS</p>
        </div>
        <!--/column --> 
      </div>
      <!--/.row --> 
      
    </div>
    <!-- /.container --> 
  </div>
  <!-- /.parallax -->
  
    <div class="wrapper light-wrapper">
    <div class="container inner">
      <h2 class="section-title text-center">Our Recent Posts</h2>
      <div class="space10"></div>
      <div class="slick-wrapper">
        <div class="slick" data-slick='{"slidesToShow": 3, "responsive": [{"breakpoint":1024,"settings":{"slidesToShow": 2}},{"breakpoint":768,"settings":{"slidesToShow": 1}}]}'>
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b1.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-red">Corporate</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Ligula tristique malesuada venenatis</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item -->
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b2.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-purple">Still Life</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Nullam id dolor id nibh ultricies vehicula</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item -->
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b3.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-lime">Concept</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Ultricies fusce porta elit urna mollis</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item -->
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b4.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-orange">Office</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Morbi leo risus, porta ac consectetur</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui. Curabitur blandit tempus porttitor pharetra augue.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item -->
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b5.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-green">Packaging</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Mollis adipiscing lorem quis risus</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item -->
          <div class="item post mr-10 ml-10">
            <figure class="overlay overlay1"><a href="#"></a><img src="style/images/art/b6.jpg" alt="" />
              <figcaption>
                <h5 class="from-top mb-0">Read More</h5>
              </figcaption>
            </figure>
            <span class="category"><a href="#" class="label bg-pink">Mood</a></span>
            <div class="post-content">
              <h3 class="post-title"><a href="blog-post.html">Fusce mattis euismod ridiculus tortor</a></h3>
              <div class="meta"><span class="date">12 Nov 2014</span><span class="comments"><a href="#">5 Comments</a></span></div>
              <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor nullam dolor blandit tempus.</p>
            </div>
            <!-- /.post-content --> 
          </div>
          <!-- /.item --> 
        </div>
        <!--/.slick -->
        <div class="space20"></div>
        <div class="slick-nav-container">
          <div class="slick-nav"></div>
        </div>
        <!--/.slick-nav-container --> 
      </div>
      <!--/.slick-wrapper --> 
    </div>
    <!-- /.container --> 
  </div>
  <!-- /.gray-wrapper -->
  
    <div class="wrapper gray-wrapper">
    <div class="container inner">
      <h2 class="section-title mb-40 text-center">Happy Customes</h2>
      <div class="slick-wrapper">
        <div class="slick" data-slick='{"slidesToShow": 3, "responsive": [{"breakpoint":1024,"settings":{"slidesToShow": 2}},{"breakpoint":768,"settings":{"slidesToShow": 1}}]}'>
          <div class="item ml-15 mr-15">
            <blockquote class="small">
              <p>“Sed posuere consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.”</p>
            </blockquote>
            <div class="feature feature-m"> <span class="icon icon-round icon-img icon-img-s"><img src="style/images/art/t1.jpg" alt=""></span>
              <h6 class="pt-15 mb-0">Connor Gibson</h6>
              <p>Interface Designer</p>
            </div>
            <!--/.feature --> 
          </div>
          <!--/.item -->
          <div class="item ml-15 mr-15">
            <blockquote class="small">
              <p>“Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit etiam porta.”</p>
            </blockquote>
            <div class="feature feature-m"> <span class="icon icon-round icon-img icon-img-s"><img src="style/images/art/t2.jpg" alt=""></span>
              <h6 class="pt-15 mb-0">Coriss Ambady</h6>
              <p>Computer Engineer</p>
            </div>
            <!--/.feature --> 
          </div>
          <!--/.item -->
          <div class="item ml-15 mr-15">
            <blockquote class="small">
              <p>“Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus. Cum sociis natoque penatibus et magnis.”</p>
            </blockquote>
            <div class="feature feature-m"> <span class="icon icon-round icon-img icon-img-s"><img src="style/images/art/t3.jpg" alt=""></span>
              <h6 class="pt-15 mb-0">Barclay Widerski</h6>
              <p>Sales Manager</p>
            </div>
            <!--/.feature --> 
          </div>
          <!--/.item -->
          <div class="item ml-15 mr-15">
            <blockquote class="small">
              <p>“Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.”</p>
            </blockquote>
            <div class="feature feature-m"> <span class="icon icon-round icon-img icon-img-s"><img src="style/images/art/t4.jpg" alt=""></span>
              <h6 class="pt-15 mb-0">Nikola Brooten</h6>
              <p>Marketing Specialist</p>
            </div>
            <!--/.feature --> 
          </div>
          <!--/.item --> 
        </div>
        <!--/.slick -->
        <div class="slick-nav-container mt-20">
          <div class="slick-nav"></div>
        </div>
        <!--/.slick-nav-container --> 
      </div>
      <!--/.slick-wrapper --> 
    </div>
    <!-- /.container --> 
  </div>


    <div class="wrapper gray-wrapper">
    <div class="container inner">
      <div class="row">
        <div class="col-sm-10">
          <h2 class="sub-heading mb-0">SIGN UP FOR A NEWSLETTER</h2>
        </div>
        <!--/column -->
        <div class="col-sm-2"> <a href="#" class="btn btn-rounded btn-l mb-0">See Portfolio</a> </div>
        <!--/column --> 
      </div>
      <!--/.row --> 
    </div>
    <!-- /.container --> 
  </div>
  <!-- /.light-wrapper --> 
</div>
<!-- /.content-wrapper -->
  <section id="contact">
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <h2 class="section-title text-center">Contact information</h2>
            <p class="text-center">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.</p>
            <ul class="icon-list list-inline text-center">
              <li><i class="et-location-pin"></i>Moonshine St. 14/05 Light City </li>
              <li><i class="et-mail"></i> <a href="mailto:first.last@email.com" class="nocolor">first.last@email.com</a> </li>
              <li><i class="et-old-phone"></i>${params["Phone"] ? params["Phone"] : '+00 (123) 456 78 90'}</li>
            </ul>
          </div>
          <!-- /column --> 
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
                      <div className="col-sm-6 pr-10">
                      <div className="form-group">
                          <input type="tel" className="form-control" name="tel" placeholder="Phone" />
                      </div>
                      </div>
                      <div className="col-sm-12">
                        <textarea name="message" className="form-control" rows={3} placeholder="Type your message here..." required defaultValue={""} />
                      <div className="radio-set radio">
                      </div>
                      <button type="submit" className="btn btn-rounded" data-error="Fix errors" data-processing="Sending..." data-success="Thank you!">Submit</button>
                      <footer className="notification-box" />
                      </div>
                  </div>
                </form>,
                document.getElementById("root")
              );
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
          <p>Maecenas faucibus molli interdum. Cras mattis consectetur purus sitor amet sed donec malesuada ullamcorper odio. Curabitur blandit tempus porttitor vollisky inceptos.</p>
          <div class="space30"></div>
          <ul class="social social-bg social-s">
            <li><a href="#"><i class="et-twitter"></i></a></li>
            <li><a href="#"><i class="et-facebook"></i></a></li>
            <li><a href="#"><i class="et-pinterest"></i></a></li>
            <li><a href="#"><i class="et-vimeo"></i></a></li>
            <li><a href="#"><i class="et-instagram"></i></a></li>
          </ul>
          <div class="space30"></div>
          <div class="contact-info"> <span> Moonshine St. 14/05 Light City </span> <span>${params["Phone"] ? params["Phone"] : '+00 (123) 456 78 90'}</span> <span> <a href="first.last@email.com" class="nocolor">first.last@email.com </a></span> </div>
        </div>
        <!-- /.widget --> 
        
      </div>
      <!-- /column --> 
    </div>
    <!-- /.row --> 
    
  </div>
  <!-- /.container -->
  <div class="sub-footer dark-wrapper inverse-text">
    <div class="container inner text-center">
      <p>© 2017 crea;tink. All rights reserved. Theme by elemis.</p>
    </div>
    <!-- /.container --> 
  </div>
  <!-- /.sub-footer --> 
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