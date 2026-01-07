import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Heritage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Heritage',
		name: 'heritage node',
		icon: { light: 'file:Heritage.svg', dark: 'file:Heritage.dark.svg' },
		group: [],
		version: 1,
		description: 'Heritage',
		defaults: {
			name: 'Heritage',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		requestDefaults: {
		baseURL: 'http://envsoedev02/api/Heritage/',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Heritage',
						value: 'heritage',
					},
				],
				default: 'heritage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'heritage',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get all Reports',
						description: 'Get all the existent herigate reports',
						routing: {
							request: {
								method: 'GET',
								url: '/Vw_bi_heritage_reports',
							},
						},
					},
					{
						name: 'Get',
						value: 'get Heritage Significance',
						action: 'Get Heritage Significance Report',
						description: 'Get the Heritage Significance Report',
						routing: {
							request: {
								method: 'GET',
								url: '/Vw_bi_Heritage_Significance_Validated',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'heritage',
						],
						operation: [
						    'get Heritage Significance',
						],
					},
				},
				options: [
					{
						displayName: 'Year',
						name: 'dbYear',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									dbYear: '={{ $value }}',
								},
							},
						},
					},
					{
						displayName: 'LGA',
						name: 'dbLGA',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									dbLGA: '={{ $value }}',
								},
							},
						},
					},
				],									
			}
		],
	};
}
