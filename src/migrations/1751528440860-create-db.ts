import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1751528440860 implements MigrationInterface {
    name = 'CreateDb1751528440860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`indictments\` (\`indictment_id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`issued_at\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`prosecution_id\` varchar(255) NULL, PRIMARY KEY (\`indictment_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prosecutions_users\` (\`prosecution_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`prosecution_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prosecutions\` (\`prosecution_id\` varchar(255) NOT NULL, \`decision\` varchar(255) NOT NULL, \`decision_date\` timestamp NOT NULL, \`reason\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, \`user_id\` varchar(255) NULL, PRIMARY KEY (\`prosecution_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`question_id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`answer\` varchar(255) NULL, \`reliability\` int NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`interview_id\` varchar(255) NULL, \`user_id\` varchar(255) NULL, PRIMARY KEY (\`question_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`permission_id\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions_roles\` (\`role_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`role_id\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cases_users\` (\`case_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`case_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`username\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`dob\` timestamp NOT NULL, \`date_attended\` timestamp NOT NULL, \`status\` varchar(255) NOT NULL, \`create_at\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`role_id\` varchar(255) NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investigation_plans\` (\`investigation_plan_id\` varchar(255) NOT NULL, \`deadline_date\` timestamp NOT NULL, \`result\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`create_at\` timestamp NOT NULL, \`plan_content\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, \`created_officer_id\` varchar(255) NULL, PRIMARY KEY (\`investigation_plan_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports_witnesses\` (\`report_id\` varchar(255) NOT NULL, \`witness_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`report_id\`, \`witness_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`witnesses\` (\`witness_id\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`contact\` varchar(255) NOT NULL, \`national\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`statement\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, PRIMARY KEY (\`witness_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`witnesses_interviews\` (\`interview_id\` varchar(255) NOT NULL, \`witness_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`interview_id\`, \`witness_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`interviews\` (\`interview_id\` varchar(255) NOT NULL, \`type_interviewee\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`attached_file\` json NOT NULL, \`start_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end_time\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`investigation_plan_id\` varchar(255) NULL, \`interviewer_id\` varchar(255) NULL, PRIMARY KEY (\`interview_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`victims_interviews\` (\`victim_id\` varchar(255) NOT NULL, \`interview_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`victim_id\`, \`interview_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`victims\` (\`victim_id\` varchar(255) NOT NULL, \`fullname\` varchar(255) NULL, \`contact\` varchar(255) NOT NULL, \`national\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`description\` varchar(255) NULL, \`injuries\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, PRIMARY KEY (\`victim_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports_victims\` (\`report_id\` varchar(255) NOT NULL, \`victim_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`report_id\`, \`victim_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports\` (\`report_id\` varchar(255) NOT NULL, \`type_report\` varchar(255) NOT NULL, \`severity\` varchar(255) NOT NULL, \`incident_date\` timestamp NOT NULL, \`description\` varchar(255) NULL, \`case_location\` varchar(255) NOT NULL, \`reported_at\` timestamp NOT NULL, \`reporter_location\` varchar(255) NOT NULL, \`reporter_fullname\` varchar(255) NOT NULL, \`reporter_email\` varchar(255) NOT NULL, \`reporter_phone_number\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(255) NOT NULL, \`case_id\` varchar(255) NULL, \`user_id\` varchar(255) NULL, PRIMARY KEY (\`report_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suspects\` (\`suspect_id\` varchar(255) NOT NULL, \`fullname\` varchar(255) NULL, \`national\` varchar(255) NULL, \`gender\` varchar(255) NOT NULL, \`dob\` timestamp NOT NULL, \`identification\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`catch_time\` timestamp NOT NULL, \`notes\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`mugshot_url\` varchar(255) NULL, \`fingerprints_hash\` varchar(255) NOT NULL, \`health_status\` varchar(255) NOT NULL, \`report_id\` varchar(255) NULL, PRIMARY KEY (\`suspect_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evidences_suspects\` (\`evidence_id\` varchar(255) NOT NULL, \`suspect_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`evidence_id\`, \`suspect_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`measure_surveys\` (\`measure_survey_id\` varchar(255) NOT NULL, \`type_name\` varchar(255) NOT NULL, \`source\` varchar(255) NULL, \`result\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`evidence_id\` varchar(255) NULL, PRIMARY KEY (\`measure_survey_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`physical_invests\` (\`evidence_id\` varchar(255) NOT NULL, \`image_url\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`records_infos\` (\`record_info_id\` varchar(255) NOT NULL, \`type_name\` varchar(255) NOT NULL, \`source\` varchar(255) NOT NULL, \`date_collected\` timestamp NOT NULL, \`summary\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`evidence_id\` varchar(255) NULL, PRIMARY KEY (\`record_info_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`warrant_results\` (\`warrant_result_id\` varchar(255) NOT NULL, \`police_response\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`notes\` varchar(255) NOT NULL, \`time_active\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`warrant_id\` varchar(255) NULL, PRIMARY KEY (\`warrant_result_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`warrants\` (\`warrant_id\` varchar(255) NOT NULL, \`warrant_name\` varchar(255) NOT NULL, \`attached_file\` json NULL, \`time_publish\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, PRIMARY KEY (\`warrant_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evidences\` (\`evidence_id\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`collected_at\` timestamp NOT NULL, \`current_location\` varchar(255) NOT NULL, \`attach_file\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, \`report_id\` varchar(255) NULL, \`user_id\` varchar(255) NULL, \`warrant_id\` varchar(255) NULL, PRIMARY KEY (\`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cases_evidences\` (\`case_id\` varchar(255) NOT NULL, \`evidence_id\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`case_id\`, \`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentences\` (\`sentence_id\` varchar(255) NOT NULL, \`sentence_type\` varchar(255) NOT NULL, \`duration\` varchar(255) NULL, \`condition\` varchar(255) NULL, \`sentencing_date\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_result_id\` varchar(255) NULL, PRIMARY KEY (\`sentence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`timelines\` (\`timeline_id\` varchar(255) NOT NULL, \`start_time\` timestamp NOT NULL, \`end_time\` timestamp NULL, \`attached_file\` json NULL, \`notes\` varchar(255) NULL, \`activity\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_result_id\` varchar(255) NULL, PRIMARY KEY (\`timeline_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`case_results\` (\`case_result_id\` varchar(255) NOT NULL, \`report_time\` timestamp NOT NULL, \`report_analyst\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`identify_motive\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NULL, PRIMARY KEY (\`case_result_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cases\` (\`case_id\` varchar(255) NOT NULL, \`case_name\` varchar(255) NOT NULL, \`type_case\` varchar(255) NOT NULL, \`severity\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`summary\` varchar(255) NULL, \`create_at\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`case_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`arrests\` (\`case_id\` varchar(255) NOT NULL, \`suspect_id\` varchar(255) NOT NULL, \`suspect_miranda_signature\` varchar(255) NULL, \`arrest_start_time\` timestamp NOT NULL, \`arrest_end_time\` timestamp NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`case_id\`, \`suspect_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`digital_invests\` (\`evidence_id\` varchar(255) NOT NULL, \`device_type\` varchar(255) NOT NULL, \`analyst_tool\` varchar(255) NOT NULL, \`result\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`events\` (\`event_id\` varchar(255) NOT NULL, \`suspect_id\` varchar(255) NOT NULL, \`case_id\` varchar(255) NOT NULL, \`time_start\` timestamp NOT NULL, \`time_end\` timestamp NULL, \`event_name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`event_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`financial_invests\` (\`evidence_id\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`forensic_invests\` (\`evidence_id\` varchar(255) NOT NULL, \`lab_name\` varchar(255) NOT NULL, \`report\` varchar(255) NOT NULL, \`result_summary\` varchar(255) NOT NULL, \`received_at\` timestamp NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`evidence_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inmates\` (\`inmate_id\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`assigned_facility\` varchar(255) NOT NULL, \`start_date\` timestamp NOT NULL, \`expected_release\` timestamp NOT NULL, \`health_status\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`inmate_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`indictments\` ADD CONSTRAINT \`FK_2e75b88bc52fc782b8885a3861a\` FOREIGN KEY (\`prosecution_id\`) REFERENCES \`prosecutions\`(\`prosecution_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prosecutions_users\` ADD CONSTRAINT \`FK_99d15c2871f64fc07bf43e5631b\` FOREIGN KEY (\`prosecution_id\`) REFERENCES \`prosecutions\`(\`prosecution_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prosecutions_users\` ADD CONSTRAINT \`FK_d8c33abc4429b79442a95a3329a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prosecutions\` ADD CONSTRAINT \`FK_5e9364776c4695bbd83d205f655\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prosecutions\` ADD CONSTRAINT \`FK_8788dd40892987620a496c2b733\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_6024b110ce4990aa1feb1386e0e\` FOREIGN KEY (\`interview_id\`) REFERENCES \`interviews\`(\`interview_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_5800cd25a5888174b2c40e67d4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_3309f5fa8d95935f0701027f2bd\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`permission_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_e08f6859eaac8cbf7f087f64e2b\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cases_users\` ADD CONSTRAINT \`FK_bca38ed4b5f75421a0a88fb343e\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cases_users\` ADD CONSTRAINT \`FK_43f00081b361d6ebe3ccef02c60\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`investigation_plans\` ADD CONSTRAINT \`FK_4b4f741837d684be06705b7db9f\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`investigation_plans\` ADD CONSTRAINT \`FK_08d804543940a350437a736673e\` FOREIGN KEY (\`created_officer_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports_witnesses\` ADD CONSTRAINT \`FK_9c5dece3673cc67cf52843c71ac\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports_witnesses\` ADD CONSTRAINT \`FK_b7177e05f10bb5f5a5b67ace890\` FOREIGN KEY (\`witness_id\`) REFERENCES \`witnesses\`(\`witness_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` ADD CONSTRAINT \`FK_f2d539f0e2665aeeb1cbdbaa75f\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`witnesses_interviews\` ADD CONSTRAINT \`FK_395823e5b67b06d5febccbe0bfa\` FOREIGN KEY (\`witness_id\`) REFERENCES \`witnesses\`(\`witness_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`witnesses_interviews\` ADD CONSTRAINT \`FK_bd51fb7805ecb70973e357026e4\` FOREIGN KEY (\`interview_id\`) REFERENCES \`interviews\`(\`interview_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interviews\` ADD CONSTRAINT \`FK_d4ce448ecdb3ea3bba1a418256e\` FOREIGN KEY (\`investigation_plan_id\`) REFERENCES \`investigation_plans\`(\`investigation_plan_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interviews\` ADD CONSTRAINT \`FK_dab087b7d082364ae58637eafbb\` FOREIGN KEY (\`interviewer_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`victims_interviews\` ADD CONSTRAINT \`FK_cafcd8873d0f1da06b019ac159a\` FOREIGN KEY (\`victim_id\`) REFERENCES \`victims\`(\`victim_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`victims_interviews\` ADD CONSTRAINT \`FK_fb4717bcceffcf05dffbd4aa752\` FOREIGN KEY (\`interview_id\`) REFERENCES \`interviews\`(\`interview_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`victims\` ADD CONSTRAINT \`FK_2c8f627ebbbf8d6575405e49291\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports_victims\` ADD CONSTRAINT \`FK_005995a69fa262fcbb618eb6bb1\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports_victims\` ADD CONSTRAINT \`FK_90a054f200e833bea72c588832b\` FOREIGN KEY (\`victim_id\`) REFERENCES \`victims\`(\`victim_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_a682c128870ee570acccda5abef\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_ca7a21eb95ca4625bd5eaef7e0c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suspects\` ADD CONSTRAINT \`FK_88cf9a31813f278b03c6fe90d48\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences_suspects\` ADD CONSTRAINT \`FK_6d92b4c3140e9fda7d72cb9b687\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences_suspects\` ADD CONSTRAINT \`FK_f043d82d1597061ff85f1595286\` FOREIGN KEY (\`suspect_id\`) REFERENCES \`suspects\`(\`suspect_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`measure_surveys\` ADD CONSTRAINT \`FK_f9e279a719b0af429ebe8073d97\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`physical_invests\` ADD CONSTRAINT \`FK_41d9359f23bf11e9c0c63076021\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`records_infos\` ADD CONSTRAINT \`FK_b37fb76df98cc46e8777fed7825\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`warrant_results\` ADD CONSTRAINT \`FK_d297eeaf104320ae0679bf89bdb\` FOREIGN KEY (\`warrant_id\`) REFERENCES \`warrants\`(\`warrant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`warrants\` ADD CONSTRAINT \`FK_79a07c6e38e37a422192d2f267c\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences\` ADD CONSTRAINT \`FK_025a63c9d883d2024ab9f254ed6\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences\` ADD CONSTRAINT \`FK_71704a4c6de0f4f2b38bcef53ec\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences\` ADD CONSTRAINT \`FK_54175007da5c95bfb5be50cdaab\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evidences\` ADD CONSTRAINT \`FK_5d35f288a2b487c7dc107c61e29\` FOREIGN KEY (\`warrant_id\`) REFERENCES \`warrants\`(\`warrant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cases_evidences\` ADD CONSTRAINT \`FK_89100b6fee543b3f09387a723cf\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cases_evidences\` ADD CONSTRAINT \`FK_d19f904c25cf4470e88887751a0\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentences\` ADD CONSTRAINT \`FK_bcf2dfbf294d317c771478079a3\` FOREIGN KEY (\`case_result_id\`) REFERENCES \`case_results\`(\`case_result_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timelines\` ADD CONSTRAINT \`FK_fee694f8c062dfd8f7162e6bb65\` FOREIGN KEY (\`case_result_id\`) REFERENCES \`case_results\`(\`case_result_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`case_results\` ADD CONSTRAINT \`FK_2192568b40b5a7f499288e1eb5b\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`arrests\` ADD CONSTRAINT \`FK_83de7623bd3191ecfe107cd21c3\` FOREIGN KEY (\`case_id\`) REFERENCES \`cases\`(\`case_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`arrests\` ADD CONSTRAINT \`FK_3afeb302fd53fa0d17b00226f18\` FOREIGN KEY (\`suspect_id\`) REFERENCES \`suspects\`(\`suspect_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`digital_invests\` ADD CONSTRAINT \`FK_165c7c95ed29c4cd3c18dfff124\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`financial_invests\` ADD CONSTRAINT \`FK_f2484aae2944a8c6148f4ceec8b\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`forensic_invests\` ADD CONSTRAINT \`FK_370e3b977eab7c896d696c6e7e3\` FOREIGN KEY (\`evidence_id\`) REFERENCES \`evidences\`(\`evidence_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`forensic_invests\` DROP FOREIGN KEY \`FK_370e3b977eab7c896d696c6e7e3\``);
        await queryRunner.query(`ALTER TABLE \`financial_invests\` DROP FOREIGN KEY \`FK_f2484aae2944a8c6148f4ceec8b\``);
        await queryRunner.query(`ALTER TABLE \`digital_invests\` DROP FOREIGN KEY \`FK_165c7c95ed29c4cd3c18dfff124\``);
        await queryRunner.query(`ALTER TABLE \`arrests\` DROP FOREIGN KEY \`FK_3afeb302fd53fa0d17b00226f18\``);
        await queryRunner.query(`ALTER TABLE \`arrests\` DROP FOREIGN KEY \`FK_83de7623bd3191ecfe107cd21c3\``);
        await queryRunner.query(`ALTER TABLE \`case_results\` DROP FOREIGN KEY \`FK_2192568b40b5a7f499288e1eb5b\``);
        await queryRunner.query(`ALTER TABLE \`timelines\` DROP FOREIGN KEY \`FK_fee694f8c062dfd8f7162e6bb65\``);
        await queryRunner.query(`ALTER TABLE \`sentences\` DROP FOREIGN KEY \`FK_bcf2dfbf294d317c771478079a3\``);
        await queryRunner.query(`ALTER TABLE \`cases_evidences\` DROP FOREIGN KEY \`FK_d19f904c25cf4470e88887751a0\``);
        await queryRunner.query(`ALTER TABLE \`cases_evidences\` DROP FOREIGN KEY \`FK_89100b6fee543b3f09387a723cf\``);
        await queryRunner.query(`ALTER TABLE \`evidences\` DROP FOREIGN KEY \`FK_5d35f288a2b487c7dc107c61e29\``);
        await queryRunner.query(`ALTER TABLE \`evidences\` DROP FOREIGN KEY \`FK_54175007da5c95bfb5be50cdaab\``);
        await queryRunner.query(`ALTER TABLE \`evidences\` DROP FOREIGN KEY \`FK_71704a4c6de0f4f2b38bcef53ec\``);
        await queryRunner.query(`ALTER TABLE \`evidences\` DROP FOREIGN KEY \`FK_025a63c9d883d2024ab9f254ed6\``);
        await queryRunner.query(`ALTER TABLE \`warrants\` DROP FOREIGN KEY \`FK_79a07c6e38e37a422192d2f267c\``);
        await queryRunner.query(`ALTER TABLE \`warrant_results\` DROP FOREIGN KEY \`FK_d297eeaf104320ae0679bf89bdb\``);
        await queryRunner.query(`ALTER TABLE \`records_infos\` DROP FOREIGN KEY \`FK_b37fb76df98cc46e8777fed7825\``);
        await queryRunner.query(`ALTER TABLE \`physical_invests\` DROP FOREIGN KEY \`FK_41d9359f23bf11e9c0c63076021\``);
        await queryRunner.query(`ALTER TABLE \`measure_surveys\` DROP FOREIGN KEY \`FK_f9e279a719b0af429ebe8073d97\``);
        await queryRunner.query(`ALTER TABLE \`evidences_suspects\` DROP FOREIGN KEY \`FK_f043d82d1597061ff85f1595286\``);
        await queryRunner.query(`ALTER TABLE \`evidences_suspects\` DROP FOREIGN KEY \`FK_6d92b4c3140e9fda7d72cb9b687\``);
        await queryRunner.query(`ALTER TABLE \`suspects\` DROP FOREIGN KEY \`FK_88cf9a31813f278b03c6fe90d48\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_ca7a21eb95ca4625bd5eaef7e0c\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_a682c128870ee570acccda5abef\``);
        await queryRunner.query(`ALTER TABLE \`reports_victims\` DROP FOREIGN KEY \`FK_90a054f200e833bea72c588832b\``);
        await queryRunner.query(`ALTER TABLE \`reports_victims\` DROP FOREIGN KEY \`FK_005995a69fa262fcbb618eb6bb1\``);
        await queryRunner.query(`ALTER TABLE \`victims\` DROP FOREIGN KEY \`FK_2c8f627ebbbf8d6575405e49291\``);
        await queryRunner.query(`ALTER TABLE \`victims_interviews\` DROP FOREIGN KEY \`FK_fb4717bcceffcf05dffbd4aa752\``);
        await queryRunner.query(`ALTER TABLE \`victims_interviews\` DROP FOREIGN KEY \`FK_cafcd8873d0f1da06b019ac159a\``);
        await queryRunner.query(`ALTER TABLE \`interviews\` DROP FOREIGN KEY \`FK_dab087b7d082364ae58637eafbb\``);
        await queryRunner.query(`ALTER TABLE \`interviews\` DROP FOREIGN KEY \`FK_d4ce448ecdb3ea3bba1a418256e\``);
        await queryRunner.query(`ALTER TABLE \`witnesses_interviews\` DROP FOREIGN KEY \`FK_bd51fb7805ecb70973e357026e4\``);
        await queryRunner.query(`ALTER TABLE \`witnesses_interviews\` DROP FOREIGN KEY \`FK_395823e5b67b06d5febccbe0bfa\``);
        await queryRunner.query(`ALTER TABLE \`witnesses\` DROP FOREIGN KEY \`FK_f2d539f0e2665aeeb1cbdbaa75f\``);
        await queryRunner.query(`ALTER TABLE \`reports_witnesses\` DROP FOREIGN KEY \`FK_b7177e05f10bb5f5a5b67ace890\``);
        await queryRunner.query(`ALTER TABLE \`reports_witnesses\` DROP FOREIGN KEY \`FK_9c5dece3673cc67cf52843c71ac\``);
        await queryRunner.query(`ALTER TABLE \`investigation_plans\` DROP FOREIGN KEY \`FK_08d804543940a350437a736673e\``);
        await queryRunner.query(`ALTER TABLE \`investigation_plans\` DROP FOREIGN KEY \`FK_4b4f741837d684be06705b7db9f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` DROP FOREIGN KEY \`FK_43f00081b361d6ebe3ccef02c60\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` DROP FOREIGN KEY \`FK_bca38ed4b5f75421a0a88fb343e\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_e08f6859eaac8cbf7f087f64e2b\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_3309f5fa8d95935f0701027f2bd\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_5800cd25a5888174b2c40e67d4b\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_6024b110ce4990aa1feb1386e0e\``);
        await queryRunner.query(`ALTER TABLE \`prosecutions\` DROP FOREIGN KEY \`FK_8788dd40892987620a496c2b733\``);
        await queryRunner.query(`ALTER TABLE \`prosecutions\` DROP FOREIGN KEY \`FK_5e9364776c4695bbd83d205f655\``);
        await queryRunner.query(`ALTER TABLE \`prosecutions_users\` DROP FOREIGN KEY \`FK_d8c33abc4429b79442a95a3329a\``);
        await queryRunner.query(`ALTER TABLE \`prosecutions_users\` DROP FOREIGN KEY \`FK_99d15c2871f64fc07bf43e5631b\``);
        await queryRunner.query(`ALTER TABLE \`indictments\` DROP FOREIGN KEY \`FK_2e75b88bc52fc782b8885a3861a\``);
        await queryRunner.query(`DROP TABLE \`inmates\``);
        await queryRunner.query(`DROP TABLE \`forensic_invests\``);
        await queryRunner.query(`DROP TABLE \`financial_invests\``);
        await queryRunner.query(`DROP TABLE \`events\``);
        await queryRunner.query(`DROP TABLE \`digital_invests\``);
        await queryRunner.query(`DROP TABLE \`arrests\``);
        await queryRunner.query(`DROP TABLE \`cases\``);
        await queryRunner.query(`DROP TABLE \`case_results\``);
        await queryRunner.query(`DROP TABLE \`timelines\``);
        await queryRunner.query(`DROP TABLE \`sentences\``);
        await queryRunner.query(`DROP TABLE \`cases_evidences\``);
        await queryRunner.query(`DROP TABLE \`evidences\``);
        await queryRunner.query(`DROP TABLE \`warrants\``);
        await queryRunner.query(`DROP TABLE \`warrant_results\``);
        await queryRunner.query(`DROP TABLE \`records_infos\``);
        await queryRunner.query(`DROP TABLE \`physical_invests\``);
        await queryRunner.query(`DROP TABLE \`measure_surveys\``);
        await queryRunner.query(`DROP TABLE \`evidences_suspects\``);
        await queryRunner.query(`DROP TABLE \`suspects\``);
        await queryRunner.query(`DROP TABLE \`reports\``);
        await queryRunner.query(`DROP TABLE \`reports_victims\``);
        await queryRunner.query(`DROP TABLE \`victims\``);
        await queryRunner.query(`DROP TABLE \`victims_interviews\``);
        await queryRunner.query(`DROP TABLE \`interviews\``);
        await queryRunner.query(`DROP TABLE \`witnesses_interviews\``);
        await queryRunner.query(`DROP TABLE \`witnesses\``);
        await queryRunner.query(`DROP TABLE \`reports_witnesses\``);
        await queryRunner.query(`DROP TABLE \`investigation_plans\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`cases_users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`prosecutions\``);
        await queryRunner.query(`DROP TABLE \`prosecutions_users\``);
        await queryRunner.query(`DROP TABLE \`indictments\``);
    }

}
