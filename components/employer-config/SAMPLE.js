const Sample = () => {
  return (
    <>
      <div class="surface-section">
        <div class="font-medium text-3xl text-900 mb-3">
          Employer Information
        </div>
        <div class="text-500 mb-5">
          Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit
          rutrum.
        </div>
        <ul class="list-none p-0 m-0">
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Title</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Heat
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
                text
              />
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">
              Frequency of Payment
            </div>
            <div class="text-900 gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
              <Chip label="Daily" className="mr-2" />
              <Chip label="Weekly" className="mr-2" />
              <Chip label="Monthly" className="mr-2" />
              <Chip label="Yearly" className="mr-2" />
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
                text
              />
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Director</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Michael Mann
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
                text
              />
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Actors</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Robert De Niro, Al Pacino
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
                text
              />
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
            <div class="text-500 w-6 md:w-2 font-medium">Plot</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              A group of professional bank robbers start to feel the heat from
              police when they unknowingly leave a clue at their latest heist.
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
                text
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sample;
