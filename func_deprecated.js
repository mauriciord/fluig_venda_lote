// ZOOM
function zoomEmpreendimento() {
	window.open("/webdesk/zoom.jsp?title=Consulta de Empreendimentos&datasetId=empreendimento&dataFields=empreendimento,Empreendimento&resultFields=empreendimento&type=empreendimento&filterValues=metadata_active,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
}
function zoomImobiliaria() {
	window.open("/webdesk/zoom.jsp?title=Consulta de Imobiliarias&datasetId=imobiliaria&dataFields=codigo,C?igo,nome,Nome,cnpj,CNPJ&resultFields=nome,cnpj&type=imobiliaria&filterValues=metadata_active,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
}
function zoomImovel() {
	var empr = document.getElementById("empreendimento").value;

	if (empr == "")
		window.open("/webdesk/zoom.jsp?title=Consulta de Im?eis&datasetId=imovel&dataFields=codigo,C?igo,numero,Numero,quadra,Quadra,area,?rea,empreendimento,Empreendimento&resultFields=numero,quadra,area,codigo&type=imovel&filterValues=metadata_active,true,liberado,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
	else
		window.open("/webdesk/zoom.jsp?title=Consulta de Im?eis&datasetId=imovel&dataFields=codigo,C?igo,numero,Numero,quadra,Quadra,area,?rea,empreendimento,Empreendimento&resultFields=numero,quadra,area,codigo&type=imovel&filterValues=metadata_active,true,liberado,true,empreendimento," + empr, "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
}
function setSelectedZoomItem(selectedItem) {
	if (selectedItem.type == "empreendimento")
		document.getElementById("empreendimento").value = selectedItem.empreendimento;
	if (selectedItem.type == "imobiliaria") {
		document.getElementById("vendedora").value = selectedItem.nome;
		document.getElementById("cnpjVendedora").value = selectedItem.cnpj;
	}
	if (selectedItem.type == "imovel") {
		document.getElementById("quadra").value = selectedItem.quadra;
		document.getElementById("numero").value = selectedItem.numero;
		document.getElementById("area").value = selectedItem.area;
		document.getElementById("codigoImovel").value = selectedItem.codigo;
	}
}
function mostraLista() {
    window.open("lista.html", "list", "width=640,height=480");
}