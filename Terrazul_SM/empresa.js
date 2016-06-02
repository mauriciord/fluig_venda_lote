$tc(window).load(function(){

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TCB EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}
	if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TCB EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('10.501.265/0001-27');
	}
	if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('10.501.265/0001-27');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('TERRAZUL SM');
	}
	if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('TERRAZUL SM');
	}

});