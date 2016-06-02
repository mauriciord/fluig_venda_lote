$tc(window).load(function(){

	if($tc('#pagamentoSinal').is('select')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').val().toLowerCase());
	}else if($tc('#pagamentoSinal').is('span')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').text().toLowerCase());
	}

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TOSCANA DESENVOLVIMENTO URBANO S/A');
	}else if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TOSCANA DESENVOLVIMENTO URBANO S/A');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('05.362.905/0001-25');
	}else if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('05.362.905/0001-25');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('ENTREVERDES');
	}else if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('ENTREVERDES');
	}

});