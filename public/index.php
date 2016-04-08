<?php



// Let's ask PHP to display all errors whenever they
// occur in our slim code,
// otherwise Slim will kind of swallow them, it will
// only show in the command like.
// Make sure you set this before other codes

// The value mast become `false` before deployment
ini_set('display_errors', true);




// Call composer to autoload(make them available)
// all classes from the the `vendor` folder

// This file is in charge of doing that, and it's
// located at vendor/autoload.php
require __DIR__ . '/../vendor/autoload.php';




// Let's announce to our application that we will be using
// the Slim application class(`vendor/slim/slim/slim/App.php`) by calling its namespace. We don't need to require it with its
// full path `vendor/slim/slim/slim/App.php`. Composer autoload
// has already done that for us up there.
use Slim\App;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;



// We now get a new instance/Object of slim app itself
// and we save it in a variable we can name `$app`
// You can name this variable anything
$app = new App();

$container = $app->getContainer();
$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};


$container['view'] = new \Slim\Views\PhpRenderer("../templates/");




// We add our first route which will respond to the home page
// request, usually located at `/` or root.
$app->get('/', function(Request $request, Response $response, $args){

    $logger = $this->get('logger');
    $logger->addInfo("Something interesting happened");

    $response = $this->view->render($response, "main.phtml", ["foo" => 'bar']);
    return $response;
});

$app->post('/notifications', function(Request $request, Response $response, $args) {

    $from = $request->getParam('from');
    $to = $request->getParam('to');

    var_dump($from);
    var_dump($to);

    die;

});




// Once we have the instance of Slim\App we can ask it to start running
// the application by calling Slim's run() function
$app->run();
