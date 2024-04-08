import EpicBody from "./EpicBody";
import EpicHeader from "./EpicHeader";

export default function Epic({epic}) {

	return <>
		<EpicHeader epic={epic}/>
		<EpicBody epic={epic} />
	</>
}