import { Component } from '@angular/core';

@Component({
  selector: 'app-our-projects-page',
  templateUrl: './our-projects-page.component.html',
  styleUrls: ['./our-projects-page.component.scss'],
  standalone: false,
})
export class OurProjectsPageComponent {
  projects = Array<Project>(
    {
      coverImage: 'images/our-projects/fessunk_almokat_kezdokep.jpg',
      title: 'Valósítsd meg az álmaid!',
      year: 2016,
      month: 'Augusztus',
      location: 'Gyergyószentmiklós',
      participants:
        '11-15 év közötti gyermekek, az Ora International Segélyszervezet Családi típusú gyermekotthonának állandó lakói.',
      organizers: ['Fodor Rita', 'Dániel Botond'],
      description:
        'Valósítad meg az álmaid! Központi üzenettel készült el az első fal, amelyet 13-15 év közötti gyerekek festettek. A csoport sajátossága, hogy a résztvevők egy gyermekjólléti intézmény lakói.<br/><br/>A csoportmunka során a résztvevőknek kihívást és nehézséget jelentett egy pozitív, önálló jövőkép megfogalmazása. Távlati célokként leginkább olyan szakmákat jelenítettek, amelyeket egy számukra kedves személy inspirált, pl. egy fodrász, tanárnő stb. Így a műhelymunka a „mi leszek, ha nagy leszek?” központi kérdést járta körül.<br/><br/>A fal összemossa a vidéki zöld dombokat a nagyváros szürke tömbházaival. Az egységes háttéren több különböző szakma és életstílus képviselteti magát. A tetováló művésztől a manikűrösön át egészen az óvónőig látunk foglalkozásokat megjelenni. Megjelenik a gazdasszony, aki zöldség és gyümölcstermesztésből él és egy sikeres sportoló is.<br/><br/>Az álmok felfestése csapatban történt. A háttér színezésében mindenki részt vett, azonban ahogy az álmok kerültek fel a falra, mindenki a saját maga által elképzelt jövőképen dolgozott. A folyamat során fontos volt egy közös kapcsolódási pontot találni, amihez mindenki kötődni tud. A résztvevők egy kulcsmondatot választottak, amely a fal központi eleme lett. Több ötlet érkezett és képezte vita tárgyát a folyamat során. Végül két kulcsmondaton maradt a fókusz. A „Merj Álmodni!” és a „Valósítsd meg az álmaid!”. A vitát az egyik résztvevő felszólalása szüntette meg, aki így érvelt: álmodni mindenki tud, de megvalósítani azt már nem. Így lett a központi üzenet a Valósítsd meg az álmaid!<br/><br/>A folyamat lezárásaként mindenki kéznyomát hagyta a falon ezzel aláírva a vállalt terveit.',
      images: [
        'images/our-projects/fessunk_almokat_1.jpg',
        'images/our-projects/fessunk_almokat_2.jpg',
        'images/our-projects/fessunk_almokat_3.jpg',
        'images/our-projects/fessunk_almokat_4.jpg',
        'images/our-projects/fessunk_almokat_5.jpg',
      ],
      expanded: false,
    },
    {
      coverImage: 'images/our-projects/tablo_kezdokep.jpg',
      title: 'TABLO Projekt - Őszi tánc',
      year: 2017,
      month: 'November',
      location: '',
      participants: 'speciális igényű gyerekek',
      organizers: ['Berszán Lídia', 'Fodor Rita'],
      description:
        'A TABLO project célja, hogy feltárjanak különböző segítésben alkalmazott, alternatív művészeti eszközöket. A mural moral módszer alkalmazását speciális igényű gyerekekkel közösen mutattuk be a nemzetközi csapatnak. A módszer és a falfestés felkeltette az érdeklődésüket. Az őszi tánc téma a gyerekeket arra ösztönözte, hogy az ősz mozgásait, színei fessék meg. Saját ötleteket alkalmazva, csoportban átbeszélve alakult a közös festmény.',
      images: [
        'images/our-projects/tablo_1.jpg',
        'images/our-projects/tablo_2.jpg',
        'images/our-projects/tablo_3.jpg',
      ],
      expanded: false,
    },
    {
      coverImage: 'images/our-projects/rhr_kezdokep.jpg',
      title: 'Részvét helyett részvétel',
      year: 2016,
      month: 'December, 5. Önkéntesség világnapja',
      location: 'Kolozsvár',
      participants: 'speciális igényű gyerekek',
      organizers: [
        'Dr. Berszán Lídia',
        'Fodor Rita',
        'Dr. Dániel Botond',
        'Deák Enikő',
      ],
      description:
        'A program egy érzékenyítő akció, melynek a célja az önkéntességre való ösztönzés. Kolozsvár egy forgalmas utcáján, arra hívtuk meg az arra járókat, hogy részvét helyett résvételükkel járuljanak hozzá a szociális problémák megoldásához. A programon megközelítőleg 160 ember vett részt, gyerekek, egyetemisták, szociális intézmények lakói, szociális munka tanszék oktatói festettek együtt. A végeredmény egy olyan festmény lett, ahol középen a föld látható és körülötte sok különböző ember, akik a másságot jelenítették meg.',
      images: [
        'images/our-projects/rhr_1.jpg',
        'images/our-projects/rhr_2.jpg',
        'images/our-projects/rhr_3.jpg',
        'images/our-projects/rhr_4.jpg',
        'images/our-projects/rhr_5.jpg',
        'images/our-projects/rhr_6.jpg',
        'images/our-projects/rhr_7.jpg',
        'images/our-projects/rhr_8.jpg',
        'images/our-projects/rhr_9.jpg',
        'images/our-projects/rhr_10.jpg',
      ],
      expanded: false,
    }
  );

  filteredProjects: Array<Project> = [...this.projects];

  filterProjectsBySearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProjects = this.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(value) ||
        project.year.toString().toLowerCase().includes(value) ||
        project.month.toLowerCase().includes(value) ||
        project.location.toLowerCase().includes(value) ||
        project.participants.toLowerCase().includes(value) ||
        project.organizers.some((organizer) =>
          organizer.toLowerCase().includes(value)
        ) ||
        project.description.toLowerCase().includes(value)
    );
  }
}

export interface Project {
  expanded: boolean;
  coverImage: string;
  title: string;
  year: number;
  month: string;
  location: string;
  participants: string;
  organizers: Array<string>;
  description: string;
  images: Array<string>;
}
