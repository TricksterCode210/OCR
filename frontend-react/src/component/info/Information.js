

const Information = () => {
	return(
		<div className={"container information-box"}>
			<div className={"row"}>
				<div className={"col-12 cim"}>
					<h1>Információ</h1>
				</div>
				<div className={"col-12 paragraph"}>
					<p className={"info-text"}>
						Itt találhatók a szükséges információk amik az oldal működéséhez szükségesek.<br/>
						Fontos megjegyezni, hogy jelenlegi állapotában a program csak is 4 bemeneti értékkel dolgozik.
						Ezeknek a formátuma ".txt", ".jpg" vagy ".png" lehet. Amennyiben a felhasználó képet tölt fel, akkor a program
						a beépített Tesseract OCR-vel fog dolgozni. Itt a kép szövegének a nagyságától függ a kiértékelési idő.
					</p>
				</div>
			</div>
			<div className={"row mt-4"}>
				<div className={"col-5 paragraph"}>
					<img className={"info-picture"} src={"info1.png"} alt={"react-logo"}/>
				</div>
				<div className={"col-7 paragraph"}>
					<p className={"info-text"}>
						Első lépés az lesz, hogy ki kell választani a nyelvet, hogy az OCR később tudja, hogy milyen nyelvvel dolgozik.
						Még ha a felhasználó nem is képet tölt fel, hanem txt formátumot, akkor is kell a nyelv beállítás, mert a háttérben a
						mondatokat úgy választjuk el, ahogy az adott nyelv mondatzáró karakterei vannak.<br/>
						Gondolok itt arra, hogy a spanyol nyelvben létezik olyan karakter mint "¿", ami a magyar féle "?" karakterrel egyezik meg,
						de ezt a gépnek tudnia kell.
					</p>
				</div>
			</div>
			<div className={"row mt-4"}>
				<div className={"col-7 paragraph"}>
					<p className={"info-text"}>
						Második lépés az lesz, hogy a 4 megjelenő sorban kiválasztjuk a formátumot, ami txt vagy kép (jpg, png) lehet. A 4 sorba nem kell megegyező típusokat feltölteni.
						Tehát ha a felhasználó 2 txt-t és 2 képet szeretne feltölteni, akkor az hibátlanul fog működni.
					</p>
				</div>
				<div className={"col-5 paragraph"}>
					<img className={"info-picture"} src={"info2.png"} alt={"react-logo"}/>
				</div>
			</div>
			<div className={"row mt-4"}>
				<div className={"col-5 paragraph"}>
					<img className={"info-picture"} src={"info3.png"} alt={"react-logo"}/>
				</div>
				<div className={"col-7 paragraph"}>
					<p className={"info-text"}>
						Miután bekerültek az adatok. Azután a felhasználónak csak rá kell kattintani az OCR eredmény készítés gombra.
						Meg kell várnia míg az alatta lévő text mezőbe megjelenik az adat. Amennyiben, vannak olyan pozíciók a szövegben, ahol a gép nem tudta
						eldönteni a helyes szó beillesztését, akkor a lehetséges opciókat felajánlja a felhasználónak. A 2 vagy 4 szó lehetőséből eldöntheti, hogy melyik fog megfelelni neki.
						A kész eredméynt elmentheti a projekt nevén és az eredmény txt fájlját is el kell neveznie.
					</p>
				</div>
			</div>
			<div className={"row mt-4"}>
				<div className={"col-7 paragraph"}>
					<p className={"info-text"}>
						A végeredményeket megtekintheti az eredmények táblában. Itt láthat egy kisebb statisztikát az eredményeiről és az eredményét letöltheti onnan később is a txt formátumban.
						Ha már nem kell Önnek tovább az eredménye azt, törölheti is majd.
					</p>
				</div>
				<div className={"col-5 paragraph"}>
					<img className={"info-picture"} src={"info4.png"} alt={"react-logo"}/>
				</div>
			</div>
		</div>
	)
}

export default Information;