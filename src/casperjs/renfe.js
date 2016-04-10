// http://stackoverflow.com/questions/21443756/casperjs-testing-jquery-autocomplete
// key events https://github.com/ariya/phantomjs/commit/cab2635e66d74b7e665c44400b8b20a8f225153a

var casper = require('casper').create({
    //verbose: true,
    //logLevel: "debug",
    viewportSize: {width: 950, height: 950}
});


var dateToLookFor = casper.cli.get("date");

var response = {status:"error"};


casper.start('http://www.renfe.com/', function() {

    var from = casper.cli.get("from");
    var to = casper.cli.get("to");

    response.from = from;
    response.to = to;


    casper.sendKeys("form#datosBusqueda input#IdOrigen", from, {keepFocus: true});
    casper.sendKeys('form#datosBusqueda input#IdOrigen', casper.page.event.key.Enter , {keepFocus: true});
    this.captureSelector('../pics/test_1_from.png', 'body');
    casper.sendKeys("form#datosBusqueda input#IdDestino", to, {keepFocus: true});


    casper.sendKeys('form#datosBusqueda input#IdDestino', casper.page.event.key.Enter , {keepFocus: true});
    this.captureSelector('../pics/test_2_to.png', 'body');
    casper.fillSelectors('form#datosBusqueda', {
        'input[name="__fechaIdaVisual"]':    dateToLookFor,
    }, false);


    this.captureSelector('../pics/test_3_date.png', 'body');

    //casper.echo(this.getFieldValue('form#datosBusqueda input#IdOrigen'));
    //casper.echo(response.completeTo = this.getElementAttribute('form#datosBusqueda input#IdOrigen'));
    //casper.echo(response.xxx = this.getElementAttribute('input[type="text"][name="IdOrigen"]', 'value'));



    casper.click("button.btn")

});
casper.then(function(){
    this.wait(4000);
});




casper.then(function() {
    this.captureSelector('../pics/test_4_fin.png', 'body');

    var date = this.getElementAttribute('input[id="fechaSeleccionada0"]', 'value');
    response.date = date;
    if (date === dateToLookFor) {
        response.isTravelDateCorrect = true;
    } else {
        response.isTravelDateCorrect = false;
    }


    if (this.exists('button[title="Comprar"]')) {
        response.thereAreTrains = true;
    } else {
        response.thereAreTrains = false;
    }
    response.status = 'ok';

    casper.echo(JSON.stringify(response));

    //casper.echo(JSON.stringify(response));
});


casper.run();
