import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  orderForm: FormGroup;
  formSubmitted = false;

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

  carouselImages = [
    'images/home_carousel_1.jpg',
    'images/home_carousel_2.jpg',
    'images/home_carousel_3.jpg',
    'images/home_carousel_4.jpg',
    'images/home_carousel_5.jpg',
  ];

  services = [
    {
      image: 'images/szolgaltatas_csapatepito.jpg',
      title: 'Csapatépítő osztályok számára',
      content:
        'Számos téma feldolgozása és a csoportkohézió javítása kihívást jelent minden osztályfőnök számára. Az általunk kidolgozott 2 napos műhelymunka (igény szerint változtatható) művészeti eszközöket és mentálhigiénés tapasztalatot igénybe véve igyekszik olyan kreatív témafeldolgozást megvalósítani, ahol a résztvevőknek lehetőségük van jobban megismerni egymást és önmagukat. Választható témák: Kommunikáció. Önismeret. Pályaorientáció- hogyan találjam meg a helyem a világban?',
    },
    {
      image: 'images/szolgaltatas_noi_onismeret.jpg',
      title: 'Alkotás központú Női önismereti csoport',
      content:
        'A női önismereti csoportokban olyan témákat járunk körül, mint a ki vagyok én Nőként? Milyen utat jártam be eddig? Hová tartok? Melyek a külső, belső erőforrásaim? A csoportokba olyan nőket várunk, akik vágynak egy kis minőségi én-időre, nyitottak a kreatív témafeldolgozásra és közelebb szeretnének kerülni magukhoz. A 6 alkalmas csoportmunka mélyebb önmagunkra való figyelést tesz lehetővé. Az általunk alkalmazott művészeti eszközök és módszerek kizökkentik a résztvevőket a konfortzónájukból és segíti az elmélyülést.',
    },
    {
      image: 'images/szolgaltatas_fesd_magad.jpg',
      title: 'Fesd magad! Önismereti műhely',
      content:
        'Önismereti műhelyünk egy 4-6 órás alkalom, ahol egy kis időre kizökkenhetünk a megszokott gondolkodási sémáinkból és lehetőségünk van megállni és egy pillanatra befele figyelni, reflektálni érzéseinkre, jelenelgi életállapotunkra.',
    },
  ];

  book = {
    title:
      'Milyen szín lennél?<br/>Önismeretet segítő, kreatív gyakorlatok gyűjteménye',
    description:
      'Ha önfejlesztésre vágysz és nyitott vagy az újszerű önkifejezést segítő módszerekre akkor ez a könyv neked szól. A gyakorlatgyűjtemény alkotásra és önismereti munkára hív. Olyan kreatív gyakorlatokat találsz benne, melyek az elmélyülést, érzelmeidre való reflektálást és az önmagadra való figyelést teszik lehetővé. A rajzolásra, festésre és kollázs technikára épülő témafeldolgozás kizökkent a megszokott gondolkodási sémákból és új perspektívát kínál az önismereti utadon. Mindezt teszi úgy, hogy közben az alkotás örömét éled át. A gyakorlatok végzése során olyan önismereti témákat járhatsz körül, mint „ki vagyok én?” kérdéskör, érzések, értékek és tulajdonságok, múlt és jövő, kapcsolatok, jelenben lenni és a problémamegoldás.<br/><br/>Az 52 gyakorlat némelyikéhez letölthető mellékleteket is találsz, ezek segítik egyes gyakorlatok elvégzését. Gyere és fedezd fel az alkotás által az önmagad felé vezető utat és ne feledd, az alkotási folyamat legalább annyira fontos, mint a végeredmény!',
  };

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      this.formSubmitted = true;
      this.orderForm.disable();
    }
  }
}
