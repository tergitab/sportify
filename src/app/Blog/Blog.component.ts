import { Component } from '@angular/core';

interface Article {
    title: string;
    description: string;
    image: string;
    content: string; // Full content of the article
}

@Component({
    selector: 'app-blog',
    templateUrl: './Blog.component.html',
    styleUrls: ['./Blog.component.scss']
})
export class BlogComponent {
    articles: Article[] = [
        {
            title: 'Rëndësia e Aktivitetit Fizik në Jetën e Përditshme',
            description: 'Aktiviteti fizik është çelësi për një trup të shëndetshëm dhe një mendje të kthjellët. Zbuloni se si të integroheni në një rutinë të rregullt sportive për të përmirësuar mirëqenien tuaj.',
            image: 'assets/images/blogu-1.webp',
            content: 'Këtu vjen përmbajtja e plotë e artikullit për rëndësinë e aktivitetit fizik në jetën e përditshme...'
        },
        {
            title: 'Si të Zgjidhni Sportin e Duhur për Ju',
            description: 'Gjetja e sportit të duhur mund të jetë një sfidë, por është e rëndësishme për të qëndruar i motivuar dhe i angazhuar. Mësoni disa këshilla praktike për të zgjedhur aktivitetin sportiv që ju përshtatet më mirë.',
            image: 'assets/images/blogu-3.webp',
            content: 'Këtu vjen përmbajtja e plotë e artikullit për si të zgjidhni sportin e duhur për ju...'
        },
        {
            title: 'Sportet dhe Ndikimi i Tyre në Zhvillimin Social',
            description: 'Sportet ndihmojnë në zhvillimin e aftësive sociale dhe bashkëpunimit. Lexoni më shumë rreth përfitimeve që sportet ekipore sjellin tek individët dhe komunitetet.',
            image: 'assets/images/blogu-2.webp',
            content: 'Këtu vjen përmbajtja e plotë e artikullit për ndikimin e sporteve në zhvillimin social...'
        },
        {
            title: 'Ambientet e reja sportive',
            description: 'Mjediset e reja sportive ofrojnë mundësi të pafundme për zhvillim  personal dhe komunitar. Zbuloni si këto mjedise ndihmojnë në krijimin e një atmosfere të shëndetshme dhe inkurajuese për të gjithë pjesëmarrësit.</',
            image: 'assets/images/parku-olimpik.jpeg',
            content: 'Këtu vjen përmbajtja e plotë e artikullit për rëndësinë e aktivitetit fizik në jetën e përditshme...'
        }
    ];

    selectedArticle: Article | null = null;

    selectArticle(article: Article): void {
        this.selectedArticle = article;
    }

    goBack(): void {
        this.selectedArticle = null;
    }
}
