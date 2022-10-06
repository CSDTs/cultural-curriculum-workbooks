import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";
import { Table, Ratio } from "react-bootstrap";
export default function CreativeSectionOne() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);
	return (
		<>
			<p>
				Any artist will have a particular style, sometimes inspired by someone else. For example, during the American
				occupation of Japan after WWII, the style of Disney's big eyed cartoon animals (think “Bambi”) were adopted by
				Japanese artists to modify their own cartoon “base”. That is how the modern form of manga comics emerged. AI can
				also copy a style, and transfer it to a different base. You can train AI, for example, on van Gough's painting
				style, and apply it to a picture of your grandmother. Since this process works like the neurons in your brain,
				it is called “Neural Style Transfer” (NST).
			</p>

			<p>
				In the case of African textile artists, new styles can be a difficult sell. Their buyers are usually focused on
				tradition. You can go to Europe for the hot new fashion, but international buyers tend to want kente weavers to
				keep making kente. Could NST offer a way to create new markets for traditional African fabricators?
			</p>

			<p>
				In the software that follows, you will be able to experiment with AI that takes African fabric styles and merges
				them with a base using an NST. The African textile makers we work with have OK'ed this activity for educational
				purposes, and in turn we helped them set up an online store: africanfuturist.org. That's the “keep it real” part
				of this activity: making sure the value gets returned to the communities who did the original work. Ready to
				help out?
			</p>

			<p>
				Experiment with this a bit. Was the African cloth the base or the style? What happens when you switch it up?
			</p>
			<Table responsive style={{ color: "white" }} variant="bordered">
				<tbody>
					<tr>
						<td>
							<img src="img/aikr_compare/create-1.png" className="img-fluid" />
						</td>
						<td>
							{" "}
							<img src="img/aikr_compare/create-2.png" className="img-fluid" />
						</td>
						<td>
							{" "}
							<img src="img/aikr_compare/create-3.png" className="img-fluid" />
						</td>
						<td>
							{" "}
							<img src="img/aikr_compare/create-4.jpeg" className="img-fluid" />
						</td>
						<td>
							{" "}
							<img src="img/aikr_compare/create-5.jpeg" className="img-fluid" />
						</td>
					</tr>
					<tr>
						<td>
							<p>Adire Cloth</p>
						</td>
						<td>
							<p>Kente Cloth</p>
						</td>
						<td>
							<p>Mud Cloth</p>
						</td>
						<td>
							<p>Adinkra Cloth</p>
						</td>
						<td>
							<p>Kuba Cloth</p>
						</td>
					</tr>
				</tbody>
			</Table>
			<p>Here are some base image samples. You can also upload an image of your own choosing.</p>
			<Table responsive style={{ color: "white" }} variant="bordered">
				<tbody>
					<tr>
						<td>
							<img src="img/aikr_compare/base/statue_of_liberty.jpg" className="img-fluid" />
						</td>
						<td>
							<img src="img/aikr_compare/base/frederick_douglass.jpg" className="img-fluid" />
						</td>

						<td>
							<img src="img/aikr_compare/base/rhianna.jpg" className="img-fluid" />
						</td>
						<td>
							<img src="img/aikr_compare/base/mona_lisa.jpg" className="img-fluid" />
						</td>
						<td>
							<img src="img/aikr_compare/base/Jemison.png" className="img-fluid" />
						</td>
					</tr>
					<tr>
						<td>
							<p>The Statue of Liberty</p>
						</td>
						<td>
							<p>Frederick Douglass</p>
						</td>
						<td>
							<p>Rhianna</p>
						</td>
						<td>
							<p>The Mona Lisa</p>
						</td>
						<td>
							<p>Mae Jemison</p>
						</td>
					</tr>
				</tbody>
			</Table>

			<p>
				So how does this work? What we are doing is called style transfer in which the style and coloring of one image
				is transferred to the presentation of another image to create a unique rendition of the two images together.
			</p>
		</>
	);
}
