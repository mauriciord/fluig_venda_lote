$tc(window).load(function(){

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TCM EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A');
	}
	if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TCM EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('14.570.528/0001-00');
	}
	if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('14.570.528/0001-00');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('LOTEAMENTO JARDIM MILANO');
	}
	if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('LOTEAMENTO JARDIM MILANO');
	}


});