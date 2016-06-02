var PagamentoSinal = document.querySelector('#pagamentoSinal')
	, Vendedora = document.querySelector('#vendedora')
	, cnpjVendedora = document.querySelector('#cnpjVendedora')
	, Empreendimento = document.querySelector('#empreendimento');

if ( PagamentoSinal.tagName.toLowerCase() == 'select' ) {
	var valorPagamentoSinal = PagamentoSinal.options[PagamentoSinal.selectedIndex].value;
	SelecionarPagamentoSinal(valorPagamentoSinal.toLowerCase());
} else if ( PagamentoSinal.tagName.toLowerCase() == 'span' ) {
	SelecionarPagamentoSinal(PagamentoSinal.innerHTML);
}

if ( Vendedora.tagName.toLowerCase() == 'input' ) {
	Vendedora.value = "TCT2 EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A.";
} else if ( Vendedora.tagName.toLowerCase() == 'span' ) {
	Vendedora.innerHTML = "TCT2 EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A.";
}

if ( cnpjVendedora.tagName.toLowerCase() == 'input' ) {
	cnpjVendedora.value = "13.122.582/0001-20";
} else if ( cnpjVendedora.tagName.toLowerCase() == 'span' ) {
	cnpjVendedora.innerHTML = "13.122.582/0001-20";
}

if ( Empreendimento.tagName.toLowerCase() == 'input' ) {
	Empreendimento.value = "LOTEAMENTO TERRAZUL BA";
} else if ( Empreendimento.tagName.toLowerCase() == 'span' ) {
	Empreendimento.innerHTML = "LOTEAMENTO TERRAZUL BA";
}
/*$tc(window).load(function(){
	if($tc('#pagamentoSinal').is('select')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').val().toLowerCase());
	}else if($tc('#pagamentoSinal').is('span')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').text().toLowerCase());
	}

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TCT2 EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A.');
	}else if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TCT2 EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A.');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('13.122.582/0001-20');
	}else if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('13.122.582/0001-20');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('LOTEAMENTO TERRAZUL BA');
	}else if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('LOTEAMENTO TERRAZUL BA');
	}
});*/