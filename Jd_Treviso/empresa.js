$tc(window).load(function(){

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TCT EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A - JD. TREVISO');
	}
	if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TCT EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A - JD. TREVISO');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('11.788.574/0001-92');
	}
	if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('11.788.574/0001-92');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('JARDIM TREVISO');
	}
	if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('JARDIM TREVISO');
	}

});