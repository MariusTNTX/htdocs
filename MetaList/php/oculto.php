<?
  $dbhost="localhost";
	$dbuser="root";
	$dbpass="admin";
	$dbname="MetaList";
	$apikey="TheBig4000MetaListMariusTNTX";

	//DECODIFICADOR DE API_KEY
	function checkTime($key){
		$local = [9,6,5,3,2,4,1,0,7,8];
  	$corresp = ['oev','gan','fbs','ump','lza','ktr','xdh','iyj','qwc','btz'];
		$segundos = 3;
		$fecha = [];
		$key = str_split($key);
		$key = array_chunk($key,3);
		for($i=0; $i<count($key); $i++){
			$key[$i] = implode("",$key[$i]);
		}
		for($i=0; $i<count($key); $i++){
			for($j=0; $j<count($corresp); $j++){
				if($key[$i]==$corresp[$j] && is_string($key[$i])){
					$key[$i]=$j;
				}
			}
		}
		for($i=0; $i<count($key); $i++){
			$fecha[$local[$i]] = $key[$i];
		}
		ksort($fecha);
		$fecha = intval(implode("",$fecha));
		$dif = strtotime("now")-$fecha;
		$verif = ($dif<$segundos) ? 1 : 0;
		if($verif==1) return true;
		return false;
	}
?>