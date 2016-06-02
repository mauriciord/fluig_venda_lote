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
	Vendedora.value = "TERRAZUL KR SPE LTDA";
} else if ( Vendedora.tagName.toLowerCase() == 'span' ) {
	Vendedora.innerHTML = "TERRAZUL KR SPE LTDA";
}

if ( cnpjVendedora.tagName.toLowerCase() == 'input' ) {
	cnpjVendedora.value = "04.701.263/0001-89";
} else if ( cnpjVendedora.tagName.toLowerCase() == 'span' ) {
	cnpjVendedora.innerHTML = "04.701.263/0001-89";
}

if ( Empreendimento.tagName.toLowerCase() == 'input' ) {
	Empreendimento.value = "TERRAZUL KR";
} else if ( Empreendimento.tagName.toLowerCase() == 'span' ) {
	Empreendimento.innerHTML = "TERRAZUL KR";
}

/*$tc(window).load(function(){

	if($tc('#pagamentoSinal').is('select')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').val().toLowerCase());
	}else if($tc('#pagamentoSinal').is('span')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').text().toLowerCase());
	}

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('TERRAZUL KR SPE LTDA');
	}else if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('TERRAZUL KR SPE LTDA');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('04.701.263/0001-89');
	}else if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('04.701.263/0001-89');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('TERRAZUL KR');
	}else if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('TERRAZUL KR');
	}

});*/