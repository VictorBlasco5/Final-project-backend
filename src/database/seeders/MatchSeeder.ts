import { Court } from "../../models/Court";
import { Match } from "../../models/Match";
import { User } from "../../models/User";
import { AppDataSource } from "../db";

export const matchSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const match1 = new Match();
        match1.number_players = 8;
        match1.signed_up = JSON.stringify([1, 3, 4, 5]) as any;
        match1.information = "Partido de amigos número 1";
        match1.match_date = "2024-05-10 12:30:00";
        const court1 = new Court()
        court1.id = 1
        match1.court = court1;
        const user1 = new User()
        user1.id = 1
        match1.user = user1;
        await match1.save();

        const match2 = new Match();
        match2.number_players = 4;
        match2.signed_up = JSON.stringify([1, 6, 4]) as any;
        match2.information = "Partido de amigos número 2";
        match2.match_date = "2024-04-09 16:45:00";
        const court2 = new Court()
        court2.id = 2
        match2.court = court2;
        const user2 = new User()
        user2.id = 3
        match2.user = user2;
        await match2.save();

        const match3 = new Match();
        match3.number_players = 6;
        match3.signed_up = JSON.stringify([1, 3]) as any;
        match3.information = "Partido de amigos número 3";
        match3.match_date = "2024-04-25 17:30:00";
        const court3 = new Court()
        court3.id = 3
        match3.court = court3;
        const user3 = new User()
        user3.id = 3
        match3.user = user3;
        await match3.save();

        const match4 = new Match();
        match4.number_players = 6;
        match4.signed_up = JSON.stringify([1, 4, 3]) as any;
        match4.information = "Partido de amigos número 4";
        match4.match_date = "2024-05-23 18:00:00";
        const court4 = new Court()
        court4.id = 4
        match4.court = court4;
        const user4 = new User()
        user4.id = 4
        match4.user = user4;
        await match4.save();

        const match5 = new Match();
        match5.number_players = 10;
        match5.signed_up = JSON.stringify([1, 5]) as any;
        match5.information = "Partido de amigos número 5";
        match5.match_date = "2024-05-24 10:00:00";
        const court5 = new Court()
        court5.id = 5
        match5.court = court5;
        const user5 = new User()
        user5.id = 5
        match5.user = user5;
        await match5.save();

        const match6 = new Match();
        match6.number_players = 6;
        match6.signed_up = JSON.stringify([1, 3, 6, 4, 5]) as any;
        match6.information = "Partido de amigos número 6";
        match6.match_date = "2024-05-25 11:30:00";
        const court6 = new Court()
        court6.id = 6
        match6.court = court6;
        const user6 = new User()
        user6.id = 6
        match6.user = user6;
        await match6.save();

        const match7 = new Match();
        match7.number_players = 4;
        match7.signed_up = JSON.stringify([1, 7, 3, 4]) as any;
        match7.information = "Partido de amigos número 7";
        match7.match_date = "2024-05-26 14:45:00";
        const court7 = new Court()
        court7.id = 7
        match7.court = court7;
        const user7 = new User()
        user7.id = 7
        match7.user = user7;
        await match7.save();

        const match8 = new Match();
        match8.number_players = 6;
        match8.signed_up = JSON.stringify([1, 5, 8, 7, 14]) as any;
        match8.information = "Partido de amigos número 8";
        match8.match_date = "2024-05-27 15:30:00";
        const court8 = new Court()
        court8.id = 8
        match8.court = court8;
        const user8 = new User()
        user8.id = 8
        match8.user = user8;
        await match8.save();

        const match9 = new Match();
        match9.number_players = 10;
        match9.signed_up = JSON.stringify([1, 3, 9]) as any;
        match9.information = "Partido de amigos número 9";
        match9.match_date = "2024-05-28 16:00:00";
        const court9 = new Court()
        court9.id = 9
        match9.court = court9;
        const user9 = new User()
        user9.id = 9
        match9.user = user9;
        await match9.save();

        const match10 = new Match();
        match10.number_players = 4;
        match10.signed_up = JSON.stringify([1, 5, 10]) as any;
        match10.information = "Partido de amigos número 10";
        match10.match_date = "2024-05-29 08:00:00";
        const court10 = new Court()
        court10.id = 10
        match10.court = court10;
        const user10 = new User()
        user10.id = 10
        match10.user = user10;
        await match10.save();

        const match11 = new Match();
        match11.number_players = 8;
        match11.signed_up = JSON.stringify([1, 3, 11, 4, 5]) as any;
        match11.information = "Partido de amigos número 11";
        match11.match_date = "2024-05-30 09:30:00";
        const court11 = new Court()
        court11.id = 5
        match11.court = court5;
        const user11 = new User()
        user11.id = 11
        match11.user = user11;
        await match11.save();

        const match12 = new Match();
        match12.number_players = 4;
        match12.signed_up = JSON.stringify([1, 8, 12, 4]) as any;
        match12.information = "Partido de amigos número 12";
        match12.match_date = "2024-05-31 10:45:00";
        const court12 = new Court()
        court12.id = 2
        match12.court = court2;
        const user12 = new User()
        user12.id = 12
        match12.user = user12;
        await match12.save();

        const match13 = new Match();
        match13.number_players = 6;
        match13.signed_up = JSON.stringify([1, 13]) as any;
        match13.information = "Partido de amigos número 13";
        match13.match_date = "2024-06-01 11:30:00";
        const court13 = new Court()
        court13.id = 9
        match13.court = court9;
        const user13 = new User()
        user13.id = 13
        match13.user = user13;
        await match13.save();

        const match14 = new Match();
        match14.number_players = 8;
        match14.signed_up = JSON.stringify([1, 3, 14, 5, 11]) as any;
        match14.information = "Partido de amigos número 14";
        match14.match_date = "2024-06-02 12:00:00";
        const court14 = new Court()
        court14.id = 7
        match14.court = court7;
        const user14 = new User()
        user14.id = 14
        match14.user = user14;
        await match14.save();

        const match15 = new Match();
        match15.number_players = 8;
        match15.signed_up = JSON.stringify([1, 5, 15, 3, 7]) as any;
        match15.information = "Partido de amigos número 15";
        match15.match_date = "2024-06-03 13:00:00";
        const court15 = new Court()
        court15.id = 1
        match15.court = court1;
        const user15 = new User()
        user15.id = 15
        match15.user = user15;
        await match15.save();

        console.log('---------------------------');
        console.log('Matches successfully saved');
        console.log('---------------------------');
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}

