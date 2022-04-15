import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KnowledgeLevel {
  level: number;
  color: string;
  wordQuantity: number;
}

export interface GroupStatistics {
  allWordsInGroup: number;
  knowledgeLevel: KnowledgeLevel[];
}

export interface IStatisticsStyleConfig {
  background: string,
  border?: string
}

@Component({
  selector: 'app-group-statistics',
  templateUrl: './group-statistics.component.html',
  styleUrls: ['./group-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupStatisticsComponent implements OnInit {
  @Input() title = 'Group statistics';
  @Input() statistics: GroupStatistics;
  @Input() expanded = false;
  @Input() isHideNotLearnedWords = false;
  @Input() styleConfig: IStatisticsStyleConfig = { background: 'white' }
  constructor() { }

  ngOnInit() {
  }

}
