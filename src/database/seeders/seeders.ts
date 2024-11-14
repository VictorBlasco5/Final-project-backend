import { roleSeedDatabase } from "./RoleSeeder";
import { userSeedDatabase } from "./UserSeeder";
import { courtSeedDatabase } from "./CourtSeeder";
import { matchSeedDatabase } from "./MatchSeeder";
import { userMatchSeedDatabase } from "./UserMatchSeeder";
import { favoriteCourtSeedDatabase } from "./FavoriteCourtsSeeder";


const launchSeeders = async () => {
    await roleSeedDatabase();
    await userSeedDatabase();
    await courtSeedDatabase();
    await matchSeedDatabase();
    await userMatchSeedDatabase();
    // await favoriteCourtSeedDatabase();
}

launchSeeders();