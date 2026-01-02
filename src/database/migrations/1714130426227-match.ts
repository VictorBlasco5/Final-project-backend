import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class Match1714130426227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "matches",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "number_players",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "signed_up",
                        type: "json",
                        isNullable: true,
                        default: "NULL"
                    },
                    {
                        name: "information",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "match_date",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "court_id",
                        type: "int",
                    },
                    
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },

                ],
                uniques: [
                    new TableUnique({
                       name: "court_date_unique",
                       columnNames: ["court_id", "match_date"],
                    }),
                 ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["court_id"],
                        referencedTableName: "courts",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("matches");
    }

}
