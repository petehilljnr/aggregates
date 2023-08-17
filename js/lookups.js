var luSources = {
	'1':'TIROHIA','2':'TAOTAOROA','3':'WAITAWHETA','4':'SMYTHES','5':'TAUHEI','6':'TETLEYS','7':'LEACHES','8':'MATATOKI','9':'GLENBROOK','10':'WAITAWHETA','11':'GLENBROOK','12':'PERRYS','13':'POPLAR LANE','14':'NGARUAWAHIA','15':'MATATOKI','16':'WORKS','17':'WHITEHALL','18':'UNKNOWN','19':'NA','20':'TAUHEI','21':'WAIOEKA','22':'PACIFIC STEEL','23':'MOTUMAOHO','24':'TAOTAOROA','25':'TAIRUA','26':'WHANGAMATA METAL','27':'KATIKATI','28':'WHITEHALL','29':'SIDDS RD','30':'COUTTS ISL','31':'WIREMU RD','32':'MEREMERE','33':'OSTERNS','34':'KCEC','35':'RANGITIKEI','36':'PIOPIO','37':'WAOTU','38':'SWAPS','39':'MANUNUI','40':'TE MATAI','41':'RANGITIKEI','42':'KAKAREKE','43':'WIREMU ROAD NORTH','44':'PUKETAPU','45':'BELMONT','46':'OSTERNS','47':'PERRYS HAMILTON','48':'LARMERS ROAD','49':'OTAIKA','50':'PUKEPOTO','51':'BELLINGHAM','52':'WHANGARIPO','53':'KERIKERI FULTN HOGAN','54':'PUKETONA','55':'PORTAGE ROAD','56':'WINSTONES','57':'PUHIPUHI','58':'PUKEKAWA','59':'DOWNERS','60':'PIROA','61':'OTAIKA','62':'HUKATERE','63':'LUNN AVE','64':'PAHIATUA','65':'WHAREHINE','66':'RELIABLE WAY','67':'BROOKBY','68':'MOTUHORA','69':'HUNUA/WINST','70':'BOMBAY MILB','71':'EAST TAMAKI','72':'RECYCLED EXISTING','73':'DRURY/STEV','74':'STERLINGS','75':'MCCALLUMS','76':'HIGGINS','77':'WAINGAWA','78':'RUAMAHANGA RIVER','79':'OTAKI','80':'WAIOHINE RIVER','81':'RANGRRBULL','82':'KIWI POINT QUARRY','83':'HOROKIWI QUARRIES','84':'AWAKERI','85':'BLUEROCK','86':'REIDS ROAD','87':'TE RANGITA','88':'WAOTU','89':'PUKEHOU','90':'ROTORUA','91':'WAIOEKA','92':'TAUHARA','93':'STAPLES','94':'GALATEA','95':'TAHUNA','96':'TE MATA','97':'PEACOCKS','98':'TAUMARANUI','99':'MATAMATA','100':'DAVIES','101':'ALLIED ASH','102':'NGARUAWAHIA','103':'STEVENSONS','104':'NGARURORO','105':'AWATOTO','106':'LOWER HUTT QUARRY','107':'WAIAPU RIVER','108':'VARIOUS SOURCES','109':'MT HERBERT','110':'LINTON','111':'WAIPAWA RIVER','112':'TAMAKI RIVER','113':'MOUTOHORA RIVER','114':'MANGATAINOKA RIVER','115':'PRENTERS','116':'LONGBURN','117':'ASHHURST','118':'BYFORDS','119':'TE RANGIITA','120':'BULLS_HIG','121':'TOETOE','122':'SANDGRAVEL','123':'ASPHALTIC','124':'YORK ROAD','125':'KAKARIKI_HIG','126':'TE MATAI','127':'WHANGAEHU RIVER','128':'CAMPION ROAD','129':'MANAWATU RIVER','130':'BULLOCK','131':'GLADSTONE','132':'AWAPUNI','133':'WAIRAU RIVER','134':'WAIRAU_GIL','135':'RENWICK','136':'T NICHOLS','137':'BLENHEIM','138':'PELORUS RIVER','139':'WAIMEA RIVER','140':'BARTLETTS','141':'APPLEBY','142':'WAIROA RIVER','143':'MARSDEN','144':'YORK QUARRY','145':'NELSON QUARRY','146':'IMPORTED','147':'MOTUEKA RIVER','148':'FLAXMORE','149':'MARSDEN VALLEY QUARR','150':'CH-CHURCH','151':'FULTON HOGAN','152':'APARIMA - L','153':'BOULDER CREEK','154':'TARAMAKAU RIVER','155':'POUND RD','156':'PARKBURN_FUL','157':'SKIPPERS PIT','158':'WAIAU RIVER','159':'HAPUKU RIVER','160':'MCLEANS ISLAND','161':'FORDS','162':'FERNIEHURST','163':'LOCAL','164':'JOHNS ROAD','165':'MINERS RD','166':'MCARTHURS RD','167':'BOYLE RIVER','168':'BITUMIX','169':'KB QUARRIES','170':'ASHBURTON','171':'ASHBURTON RIVER','172':'LEVELS PIT','173':'PARKBURN_DNZ','174':'HILDERTHORPE','175':'MAKIKIHI RIVER','176':'OPIHI RIVER','177':'OHAU A','178':'OMARAMA','179':'PARKBURN','180':'ORARI RIVER','181':'CCC','182':'WASHDYKE','183':'WAIMAKARIRI RIVER','184':'HORNBY','185':'BALCLUTHA','186':'GORE','187':'BLACKHEAD','188':'EARNSCLEUGH','189':'ORETI - WINT','190':'MATAURA - G','191':'APARIMA - U','192':'ORETI','193':'ORETI - LOW','194':'ORETI-B','195':'APARIMA','196':'ORETI - MID','197':'ORETI - MOSS','198':'ORETI - LUMS','199':'WHITESTONE','200':'TWIZEL','201':'MUTTONTOWN','202':'ALEXANDRA','203':'KYEBURN','204':'WEST EWEBURN','205':'MATAURA - R','206':'MATAURA','207':'MCGREGORS WHITESTONE','208':'UPUKERORA','209':'RAINBOW MOUNTAIN','210':'WAIAU-CLIF','211':'CALCINED BAUXITE','212':'MATAKANA','213':'HUNTLY QUA','214':'MANUNUI','215':'BALDROCK','216':'JOHNSONS','217':'MANGATAWHIRI','218':'DUNEDIN','219':'MILLBROOK PAKIRI','220':'MURCHISON','221':'WHITFORD QUARRY','222':'HURUNUI RIVER SH7','223':'GLENBROOK','224':'PUKETONA','225':'TURIWIRI','226':'WAOTU','227':'NGARURORO','228':'SELWYN RIVER','229':'RAKAIA SOMERTON','230':'HAMILTON','231':'WAIPARA RIVER','232':'HOROMANGA RIVER','233':'CRAWFORD PIT','234':'WINDY POINT','235':'MCGREGORS','236':'MOHAKA AGG','237':'SMYTHES'
};

var luContracts = {
	'1':'(NOC) BOP EAST','2':'(NOC) BOP WEST','3':'AUCK ALLIANCE','4':'(NOC) CENTRAL WAIKATO','5':'(NOC) EAST WAIKATO','6':'(EC) WEST WAIKATO NORTH','7':'(NOC) TARANAKI','8':'(EC) WEST WAIKATO SOUTH','9':'(NOC) NORTHLAND','10':'(NOC) MANAWATU-WHANGANUI','11':'(NOC) WELLINGTON','12':'(NOC) TAIRAWHITI ROADS WESTERN','13':'(NOC) TAIRAWHITI ROADS NORTHERN','14':'(NOC) HAWKES BAY','15':'(NOC) NELSON-TASMAN','16':'(EC) MARLBOROUGH','17':'(NOC) WEST COAST','18':'(NOC) NORTH CANTERBURY','19':'(NOC) SOUTH CANTERBURY','20':'(NOC) SOUTHLAND','21':'(NOC) COASTAL OTAGO','22':'MILFORD','23':'(NOC) OTAGO CENTRAL'
};

var luMaterials = {
	'1':'1CHIP','2':'2CHIP','3':'3CHIP','4':'AC','5':'ACM','6':'B/S','7':'BBM','8':'BOLID','9':'CAPE','10':'COMB','11':'CONC','12':'DGM','13':'ENRAC','14':'ENRCS','15':'EPA','16':'EPAHS','17':'EPAHV','18':'FRIC','19':'INBLK','20':'LOCK','21':'METAL','22':'OGEM','23':'OGPA','24':'OGPA2','25':'OGPAH','26':'OGPAV','27':'OTHER','28':'PSEAL','29':'PSKID','30':'RACK','31':'RCHIP','32':'REJAC','33':'REJCS','34':'SLRY','35':'SMA','36':'TEXT','37':'UTA','38':'VFILL'
};

var luCategories = {
	'1':'Chip Seal','2':'Asphaltic Mix','3':'Concrete','4':'Other','5':'Metal'
};

var luFunction = {
	'1': 'First Coat',
	'2': 'Second Coat',
	'R': 'Reseal',
	'M': 'Membrane',
	'N': 'Not Applicable',
	'E': 'Enrichment',
	'P': 'Pre-levelling'
};

var luUrban = {
	'U': 'Urban',
	'R': 'Rural'
};

var luCurves = {
	'1':'1: < 100m',
	'2':'2: 100m to 250m',
	'3':'3: 250m to 500m',
	'4':'4: 500m to 1,000m',
	'5':'5: 1,000m+'
};

var luHierarchy = {
	'1':'LOW VOLUME','2':'ACCESS','3':'SECONDARY COLLECTOR','4':'PRIMARY COLLECTOR','5':'ARTERIAL','6':'REGIONAL','7':'NATIONAL','8':'HIGH VOLUME','9':'NOT REQUIRED'
};

var luTraffic = {
	'1':'a. < 100',
	'2':'b. 100 to 200',
	'3':'c. 200 to 500',
	'4':'d. 500 to 1,000',
	'5':'e. 1,000 to 2,000',
	'6':'f. 2,000 to 5,000',
	'7':'g. 5,000 to 10,000',
	'8':'h. 10,000 to 20,000',
	'9':'i. 20,000+'
};

var luHeavies = luTraffic;

var luChartNames = {
	'#rowChart-sources' : 'Source(s): ',
	'#barChart-contract' : 'Contract(s): ',
	'#barChart-psv' : 'PSV Value(s): ',
	'#barChart-age' : 'Age(s): ',
	'#barChart-material' : 'Material(s): ',
	'#pieChart-category' : 'Material Cat(s): ',
	'#pieChart-function' : 'Surface Function(s): ',
	'#pieChart-urban' : 'Urban/Rural: ',
	'#rowChart-site' : 'Skid Site(s): ',
	'#barChart-gradient' : 'Gradient Range: ',
	'#rowChart-curve' : 'Curve Range(s): ',
	'#barChart-mpd' : 'MPD Range: ',
	'#rowChart-traffic' : 'Traffic Range(s): ',
	'#rowChart-heavy' : 'Heavy Traffic Range(s): ',
	'#rowChart-hierarchy' : 'Hierarchy(s): '
}

var luChartNamesMeta = {
	'#rowChart-sources' : ['source','number','discrete',luSources],
	'#barChart-contract' : ['contract','number','discrete',luContracts],
	'#barChart-psv' : ['psv','number','discrete',null],
	'#barChart-age' : ['age','number','discrete',null],
	'#barChart-material' : ['material','number','discrete',luMaterials],
	'#pieChart-category' : ['surf_category','number','discrete',luCategories],
	'#pieChart-function' : ['function','text','discrete',luFunction],
	'#pieChart-urban' : ['urban_rural','text','discrete',luUrban],
	'#rowChart-site' : ['skid_site','text','discrete',null],
	'#barChart-gradient' : ['gradient','number','range',null],
	'#rowChart-curve' : ['curvature','number','discrete',luCurves],
	'#barChart-mpd' : ['mpd','number','range',null],
	'#rowChart-traffic' : ['traffic','number','discrete',luTraffic],
	'#rowChart-heavy' : ['heavy','number','discrete',luHeavies],
	'#rowChart-hierarchy' : ['hierarchy','number','discrete',luHierarchy],
}
