import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
  standalone: false,
})
export class OurServicesComponent {
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
}
