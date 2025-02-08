import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  standalone: false,
})
export class TestimonialsComponent {
  testimonials = [
    {
      title: 'Falfestés nőkről és nőiességről',
      content:
        '<b>Folytatják a gyergyószentmiklósi sikátor falainak festését. A Fessünk Álmokat! néven futó programot idén hetedik alkalommal szervezi meg a Gyergyói Közösségi és Szociális Erőforrásközpont.</b><br/>Idén kicsit rendhagyóbb lesz a program témája: nem jövőképekkel fognak dolgozni, hanem egy üzenetet szeretnének átadni a résztvevők. Kolumbán Rita, a program szervezője szerint Gyergyószéken szükség van arra, hogy női önismeretről, nőiességről, női szerepekről essen szó, ezt egy felméréssel is alátámasztották. Ebből kiindulva a hetedik kép a sikátor falán ennek a témának a boncolgatásából fog születni.<br/>A programnak két része van. Ahogy minden évben, a falfestést most is csoportos munka fogja megelőzni. Először művészetterápiás eszközökkel boncolgatják a nőiesség kérdését, és megtervezik a fal alapterveit, majd a második részben önkéntesek segítségével kivitelezik. Ide természetesen bárkit szívesen látnak – mondta a szervező. Részleteket és időpontokat a Fessünk Álmokat! Facebook-oldalán lehet megtalálni.<br/>Kolumbán Rita mentálhigiénés szakemberként hangsúlyozta, hogy mindig igyekezett úgy megtervezni a programot, hogy ne csak egy festegetésnek tűnjön, hanem legyen egy mögöttes tartalma, egy üzenete a város felé. 2016 óta hat különböző korosztály álmait, vágyait, gondolatait tekinthetjük meg a sikátor falán: kis- és középiskolások, fiatal felnőttek, családok, idősek és mozgássérültek keze nyoma is megmaradt.<br/>A Fessünk Álmokat Program Kolumbán Rita alapötletéből származik. Mentálhigénét tanult mesterképzésen, amikor megismerkedett a programban használt módszerrel.<br/>– Részt vettem egy Erasmus-képzésen Spanyolországban, és ott találkoztam ezzel a Mural Moral módszerrel, hogy közösségi témákat dolgoztak fel és festettek meg kültéri falakra. Arra gondoltam, hogy nemcsak közösségi témákat, hanem személyes témákat is fel lehetne dolgozni így. Az évek során ötvöztem a Mural Moral módszerét a mentálhigénés módszerekkel, amit tanultam, és így alakult ki a Fessünk Álmokat Program – ismertette az előzményeket. Azon túl, hogy jó szórakozás festeni, célja, hogy mindig minden évben adjon valamit a résztvevőknek az önismereti gyakorlatok segítségével, legyen egy mélyebb tartalma.<br/>Az idei foglalkozásokra még vannak szabad helyek, ma estig lehet még jelentkezni, holnap kezdődik a munka első fele, majd augusztus végén felkerül az újabb üzenet a sikátor falaira.',
      author: 'Fórika Dóra',
      link: 'https://hargitanepe.ro/falfestes-nokrol-es-noiessegrol/',
      image: 'images/testemonial_1.jpg',
      expanded: false,
    },
    {
      title: 'Idősek álmai a sikátor falán ',
      content:
        'A Fessünk Álmokat program ötödik évében az idősebb korosztályt szólította meg. A program 2016-ban indult azzal a célja, hogy különböző csoportok jövőképét álmát jelenítse meg a Gyergyószentmiklósi Szent Miklós templom és Fogarassy Mihály Általános iskola szomszédságában lévő sikátor falán. Idén immár 50 méternyi színes jövőkép díszíti a falat. Megjelennek rajta gyerekek, serdülők, fiatal felnőttek, családok és idősek álmai. <br/> Idén a programba az Őszirózsák Idősek Klubja vett részt, ők tervezték és álmodták meg a falat a két napos műhelymunka alatt. A fal megfestését önkéntesek vállalták azzal a céllal, hogy pontosan megjelenítik azt a tervet, amit az idősek rajzoltak meg. <br/> A műhelymunka során az idősek megrajzolták az életutjukat kiemelve azokat a pillanatokat melyekre szívesen emlékeznek. Ezekből a pozitív történésekből kiindulva kezdték megtervezni a falat, megjelenítve azokat az álmokat, melyeket szeretnének elérni. A falon megjelenő elemek mindegyike saját jelentéssel bír.',
      author: 'Erőforrás Központ',
      link: 'https://eroforraskozpont.ro/tehetseggondozas/sociostartup/215-fessuenk-almokat-2020.html',
      image: 'images/testemonial_2.jpg',
      expanded: false,
    },
    {
      title: 'A mozgássérültek álmait festették a falra',
      content:
        'Hat évvel ezelőtt indult útjára Gyergyószentmiklóson a Fessünk álmokat! program, minden évben egy-egy korosztály „álmát” festették a kórház és a Fogarasy Mihály Általános Iskola között lévő sikátor korábban elhanyagolt falára. Idén a mozgássérülteké volt a főszerep. <br/> Külföldi példát hozott el hat évvel ezelőtt Gyergyószentmiklósra a Gyergyói Közösségi és Szociális Erőforrásközpont. A Fessünk álmokat! program részeként, pályázati támogatások segítségével igyekeztek minél több embert megszólítani, és kissé szebbé varázsolni a sikátort – tudtuk meg Kolumbán Rita programvezetőtől, aki elmondta, hogy eredetileg öt évre tervezték ezt a programot, de megkereste őket a Gyergyói Mozgó-sérültek Egyesülete, hogy ők is szívesen megfestenék az álmaikat. A megvalósítást tervezés előzte meg, az egyéni ötleteket formálták egy egésszé, és a mozgássérültek, valamint az önkéntesek közösen készítették el a nagyon mély üzenetet közvetítő alkotást. Kozma Albert, a Gyergyói Mozgó-Sérültek Egyesületének alelnöke szerint hidakat, és nem falakat kellene építeni egymás felé. <br/> „Több éve figyelemmel kísértük, amikor mások festettek, és úgy gondoltuk, hogy mi is meg szeretnénk osztani egy üzenetet. Már tavasz óta készültünk arra, hogy megfessük a közös álom- és jövőképünket. Azt szeretnénk ezáltal üzenni a környezetünk felé, hogy mi is ugyanolyan értékű emberek vagyunk, mint mások, mi is a társadalom részét képezzük. Fontosnak tartjuk, hogy eltűnjenek az előítéletek, félelmek, ne sajnáljanak, hanem fogadjanak el minket. Ne falakat, hanem hidakat építsünk egymás felé” – hangsúlyozta Kozma Albert, az egyesület alelnöke. A színes rajzok mellett feliratok is találhatóak a falrészen: Lásd az embert – Lépd át a korlátaidat – Merj nagyot álmodni; ezek is a mozgásukban korlátozott gyergyószentmiklósiak üzenetét közvetítik. A Gyergyói Mozgó-sérültek Egyesülete hivatalosan csak idén alakult meg, de már több éve igyekszik összefogni, segíteni társait Brassai Csaba elnök. A legfontosabbnak azt tartjuk, hogy kimozdítsuk a lakásaikból a mozgássérülteket, mert nagyon sokan vannak, akik begubóznak, nem jönnek ki a városba. A mindenkori önkormányzatot pedig arra biztatjuk, ismerjék fel, hogy nekünk is el kell jutni egyik helyről a másikra, és próbáljanak igazodni a mi igényeinkhez is, amikor egy-egy fejlesztést végeznek a városban – emelte ki az egyesület elnöke. Az erőforrásközpont önkéntesei és a mozgássérültek közösen festettek. <br/> Az egyesületnek 10–15 olyan aktív tagja van, akik hetente találkoznak, és vannak, akik csak online kapcsolódnak be, vagy csak időnként vesznek részt a programokon, hiszen különböző a sérültségük. Kolumbán Rita, a Fessünk álmokat! program vezetője elmondta, szeretnék ezt az elképzelést folytatni, hiszen a sikátorban még vannak összevissza firkált falrészek. Nehézséget okoz, hogy mivel a Szent Miklós-templom műemlék, 100 méteres körzetében csak engedéllyel lehet a további részeket lefesteni. Ennek ellenére remélik, hogy jövőben folytatódik a program, amit év közben is szeretnének több akcióval kibővíteni. A tapasztalatuk ugyanis az, hogy ezt a módszert pályaorientáció és önismeret-fejlesztő gyakorlatként is hasznosítani tudnák a gimnáziumi tanulók számára.',
      author: 'Székelyhon.ro',
      link: 'https://szekelyhon.ro/aktualis/a-mozgasserultek-almait-festettek-a-falra?fbclid=IwAR3mG91xOWaoWMyPW67i1hA1vIVGb77yvEiuqu399y_bEDfwDw516PVVyS8#',
      image: 'images/testemonial_3.jpg',
      expanded: false,
    },
  ];
}
