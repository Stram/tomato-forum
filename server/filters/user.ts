import ApplicationFilter from 'filters/application';

export default class UserFilter extends ApplicationFilter {
  constructor(params: any) {
    super(params);
  }

  results() {
    // this.params
  }
}






// module Api
//   class BillabilityReportFilter < ApplicationFilter
//     def results
//       reports = @scope
//
//       reports = reports.select(select_sql)
//
//       reports = reports.where(person_id: person_id) if person_id
//       reports = reports.where(service_type_id: service_type_id) if service_type_id
//
//       reports = reports.where('date >= ?', after) if after
//       reports = reports.where('date <= ?', before) if before
//       reports = reports.where(tags_sql, ActsAsTaggableOn::Tag.named_any(tags).select(:id)) if tags
//
//       reports = reports.group(grouper.group_key)
//     end
//
//     private
//
//     def select_sql
//       [
//         "'#{grouper.symbol}' AS `group`",
//         "#{select_sql_key(:person)} AS person_id",
//         "#{select_sql_key(:service_type)} AS service_type_id",
//         'SUM(internal_time) AS internal_time',
//         'SUM(client_time) AS client_time',
//       ]
//     end
//
//     def select_sql_key(key)
//       grouper.symbol == key ? grouper.group_key : 'NULL'
//     end
//
//     def person_id
//       param(:person_id)
//     end
//
//     def service_type_id
//       param(:service_type_id)
//     end
//
//     def tags
//       param(:tags)
//     end
//
//     def after
//       @after ||= param_date(:after)
//     end
//
//     def before
//       @before ||= param_date(:before)
//     end
//
//     def tags_sql
//       "EXISTS (
//         SELECT 1
//         FROM taggings
//         WHERE taggable_id = person_id AND taggable_type = 'Person' AND tag_id in (?)
//       )"
//     end
//
//     def group
//       param(:group)
//     end
//
//     def grouper
//       @grouper ||= Grouper.find(group) || Grouper.person
//     end
//
//     class Grouper < Enumeration::Base
//       values person: { id: 1, name: 'Person' },
//              service_type: { id: 2, name: 'Service type' }
//
//       def group_key
//         "#{symbol}_id"
//       end
//     end
//   end
// end
