//variables related XMLHttpRequest
//by Jacob 
var xmlHttpRequest;

//variables related VelvetMem Calculator
var readSize = 0; //Read size in bp (base pairs)
var genomeSize = 0; //Genome size in Mbp (megabase pairs)
var numReads = 0; //Number of reads in millions
var k = 0; //k-mer size (parameter of Velvet)
var mem = 0;
var mem_gb = 0;
var cov = 0;

if(window.XMLHttpRequest) 
	xmlHttpRequest = new XMLHttpRequest();
else if (window.ActiveXObject) {
	xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

function VelvetMemCalculator (read_size,genome_size,num_reads,kmer)
{
	//mem = (-109635) + (18977*read_size) + (86326*genome_size) + (233353*num_reads) - (51092*kmer);
	
	//mem_gb = Math.ceil((mem/(1024.0*1024)));
	mem_gb = Math.ceil((((-109635) + (18977*read_size) + (86326*genome_size) + (233353*num_reads) - (51092*kmer))/(1024.0*1024)));
	cov = (read_size*num_reads*1.0)/genome_size;
	
	document.getElementById("velvetMem").style.visibility = "visible";	
	document.getElementById("spMemory").innerHTML = "<b>" + mem_gb + "</b>";
	document.getElementById("spCoverage").innerHTML = "<b><strike>" + cov + "</strike></b>";
	//alert("mem = " + mem_gb);
}		

function launchVelvetMem () {
	var credits = "credits.txt"; 
	
	readSize = document.getElementById("txtReadSize");
	genomeSize = document.getElementById("txtGenomeSize");
	numReads = document.getElementById("txtNumReads");
	k = document.getElementById("txtK");
	
	if(xmlHttpRequest) {
		xmlHttpRequest.open("GET",credits);
		xmlHttpRequest.onreadystatechange = function() {
			switch(xmlHttpRequest.readyState) {
				case 1:
						break;
				case 2:
						break;
				case 3:
						break;
				case 4:
						//get credits
						//document.getElementById("copyright").innerHTML = xmlHttpRequest.responseText;
						//call VelvetMemCalculator function
					    VelvetMemCalculator(readSize.value,genomeSize.value,numReads.value,k.value);
					    //alert(xmlHttpRequest.responseText);
						break;
			
			}//end_switch
		};//end_function
		xmlHttpRequest.send(null);
	}//end_if
}



