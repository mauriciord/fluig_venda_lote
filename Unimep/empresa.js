$tc(window).load(function(){

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TCMEP EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}
	if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TCMEP EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('10.320.670/0001-49');
	}
	if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('10.320.670/0001-49');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('JARDIM RESIDENCIAL UNIMEP');
	}
	if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('JARDIM RESIDENCIAL UNIMEP');
	}

});